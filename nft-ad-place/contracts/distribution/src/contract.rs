use cosmwasm_std::{
    coins, ensure, to_binary, Addr, BankMsg, Decimal, Deps, DepsMut, Env, MessageInfo, Response,
    StdError, Uint128, Uint64, WasmMsg,
};
use cw721::Cw721ExecuteMsg;
use cw_storage_plus::{Bounder, Item, Map};
use cw_utils::{Duration, Expiration};
use sylvia::{contract, schemars};

use crate::cw721_receive;
// Fixing multitest generation issues
#[cfg(test)]
use crate::cw721_receive::multitest_utils::Cw721ReceiveProxy;

use crate::error::ContractError;
use crate::responses::{AllStakedResp, InstantiateData, StakeInfoResp};
use crate::state::{Config, StakeInfo, Staker, State};

/// How much points is the worth of single token in token distribution.
///
/// 4_000_000_000 is choosen as the closest to reasonable 32bits shift,
/// still being decimal-friendly. It reduces how much tokens may be handled by this contract
/// (it is now ~96-bit integer instead of 128). In original ERC2222 it is handled by 256-bit
/// calculations, but I256 is missing and it is required for this.
pub const POINTS_SCALE: u128 = 4_000_000_000;

const PAGINATION_LIMIT_DEFAULT: u32 = 10;
const POGINATION_LIMIT_MAX: u32 = 40;

const CONTRACT_NAME: &str = "ad-market:distribution";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

fn clip_limit(limit: Option<u32>) -> usize {
    limit
        .unwrap_or(PAGINATION_LIMIT_DEFAULT)
        .min(POGINATION_LIMIT_MAX) as _
}

pub struct Distribution<'a> {
    /// Contract configuration
    pub config: Item<'a, Config>,
    /// Distribution state
    pub state: Item<'a, State>,
    /// Distribution related info per staker
    pub stakers: Map<'a, &'a Addr, Staker>,
    /// Staked NFTs addresses (their token ids
    pub nfts: Map<'a, &'a str, StakeInfo>,
}

#[contract(error = ContractError)]
#[messages(cw721_receive as NftReceive)]
impl Distribution<'_> {
    pub const fn new() -> Self {
        Self {
            config: Item::new("config"),
            state: Item::new("state"),
            stakers: Map::new("stakers"),
            nfts: Map::new("nfts"),
        }
    }

    #[msg(instantiate)]
    fn instantiate(
        &self,
        (deps, _env, _info): (DepsMut, Env, MessageInfo),
        denom: String,
        unstake_period: Uint64,
        collection: String,
        color: String,
        part: Decimal,
    ) -> Result<Response, ContractError> {
        cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

        self.config.save(
            deps.storage,
            &Config {
                denom,
                unstake_period: Duration::Time(unstake_period.into()),
                collection: deps.api.addr_validate(&collection)?,
                color: color.clone(),
            },
        )?;

        self.state.save(
            deps.storage,
            &State {
                points_per_weight: Uint128::zero(),
                points_leftover: Uint128::zero(),
                withdrawable_total: Uint128::zero(),
                total_weight: 0,
            },
        )?;

        let data = InstantiateData { part, color };
        let resp = Response::new().set_data(to_binary(&data)?);

        Ok(resp)
    }

    #[msg(exec)]
    fn distribute(
        &self,
        (deps, env, _info): (DepsMut, Env, MessageInfo),
    ) -> Result<Response, ContractError> {
        let config = self.config.load(deps.storage)?;
        let mut state = self.state.load(deps.storage)?;

        ensure!(state.total_weight > 0, ContractError::NoNfts);

        let balance = deps
            .querier
            .query_balance(env.contract.address, config.denom)?
            .amount;

        let amount = balance - state.withdrawable_total;
        let points = amount.u128() * POINTS_SCALE + state.points_leftover.u128();
        let ppw = points / state.total_weight as u128;

        state.points_leftover = (points % state.total_weight as u128).into();
        state.points_per_weight += Uint128::new(ppw);
        state.withdrawable_total += amount;

        self.state.save(deps.storage, &state)?;

        let resp = Response::new()
            .add_attribute("action", "distribute_tokens")
            .add_attribute("amount", amount);

        Ok(resp)
    }

    #[msg(exec)]
    fn request_unstake(
        &self,
        (deps, env, info): (DepsMut, Env, MessageInfo),
        token_id: String,
    ) -> Result<Response, ContractError> {
        let mut nft = self.nfts.load(deps.storage, &token_id)?;

        if let Some(expiration) = nft.unstake_at {
            // We never go with height-based unstaking, so this is only to decomposite expiration time
            let unstake_at = match expiration {
                Expiration::AtTime(timestamp) => timestamp.to_string(),
                _ => String::new(),
            };

            let resp = Response::new()
                .add_attribute("action", "request_unstake")
                .add_attribute("token_id", token_id)
                .add_attribute("staker", info.sender)
                .add_attribute("unstake_at", unstake_at);

            return Ok(resp);
        }

        ensure!(nft.owner == info.sender, ContractError::Unauthorized);

        let config = self.config.load(deps.storage)?;
        let unstake_at = config.unstake_period.after(&env.block);
        nft.unstake_at = Some(unstake_at);
        self.nfts.save(deps.storage, &token_id, &nft)?;

        let mut state = self.state.load(deps.storage)?;
        state.total_weight -= 1;
        self.state.save(deps.storage, &state)?;

        let ppw = state.points_per_weight.u128() as i128;

        self.stakers.update(
            deps.storage,
            &info.sender,
            |staker| -> Result<_, ContractError> {
                let mut staker =
                    staker.ok_or_else(|| ContractError::NoStakerEntry(info.sender.to_string()))?;

                staker.weight -= 1;
                staker.points_correction = (i128::from(staker.points_correction) + ppw).into();

                Ok(staker)
            },
        )?;

        // We never go with height-based unstaking, so this is only to decomposite expiration time
        let unstake_at = match unstake_at {
            Expiration::AtTime(timestamp) => timestamp.to_string(),
            _ => String::new(),
        };

        let resp = Response::new()
            .add_attribute("action", "request_unstake")
            .add_attribute("token_id", token_id)
            .add_attribute("staker", info.sender)
            .add_attribute("unstake_at", unstake_at);

        Ok(resp)
    }

    #[msg(exec)]
    fn unstake(
        &self,
        (deps, env, info): (DepsMut, Env, MessageInfo),
        token_id: String,
        receiver: Option<String>,
    ) -> Result<Response, ContractError> {
        let nft = self.nfts.load(deps.storage, &token_id)?;

        ensure!(nft.owner == info.sender, ContractError::Unauthorized);
        ensure!(
            matches!(nft.unstake_at, Some(expiration) if expiration.is_expired(&env.block)),
            ContractError::UnstakePeriodOngoing
        );

        self.nfts.remove(deps.storage, &token_id);

        let recipient = receiver.unwrap_or_else(|| info.sender.to_string());

        let transfer = Cw721ExecuteMsg::TransferNft {
            recipient: recipient.clone(),
            token_id,
        };

        let config = self.config.load(deps.storage)?;

        let msg = WasmMsg::Execute {
            contract_addr: config.collection.into(),
            msg: to_binary(&transfer)?,
            funds: vec![],
        };

        let resp = Response::new()
            .add_attribute("action", "unstake")
            .add_attribute("staker", info.sender)
            .add_attribute("receiver", recipient)
            .add_message(msg);

        Ok(resp)
    }

    #[msg(exec)]
    pub fn withdraw(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        receiver: Option<String>,
    ) -> Result<Response, ContractError> {
        let mut staker = self.stakers.load(deps.storage, &info.sender)?;
        let mut state = self.state.load(deps.storage)?;

        let points = ((state.points_per_weight.u128() * staker.weight as u128) as i128)
            + i128::from(staker.points_correction.clone());
        let points = points as u128;

        let amount = Uint128::new(points / POINTS_SCALE);
        let amount = amount - staker.withdrawn_funds;

        staker.withdrawn_funds += amount;
        state.withdrawable_total -= amount;
        self.stakers.save(deps.storage, &info.sender, &staker)?;
        self.state.save(deps.storage, &state)?;

        let config = self.config.load(deps.storage)?;

        let to_address = receiver.unwrap_or_else(|| info.sender.to_string());
        let msg = BankMsg::Send {
            to_address: to_address.clone(),
            amount: coins(amount.u128(), config.denom),
        };

        let resp = Response::new()
            .add_attribute("action", "withdraw")
            .add_attribute("amount", amount)
            .add_attribute("receiver", to_address)
            .add_message(msg);

        Ok(resp)
    }

    #[msg(query)]
    pub fn all_staked(
        &self,
        (deps, _env): (Deps, Env),
        start_after: Option<String>,
        limit: Option<u32>,
        owner: Option<String>,
        include_unstaking: Option<bool>,
    ) -> Result<AllStakedResp, ContractError> {
        let limit = clip_limit(limit);
        let include_unstaking = include_unstaking.unwrap_or(false);

        let start_after = start_after
            .as_ref()
            .and_then(|sa| sa.as_str().exclusive_bound());

        let nfts = self
            .nfts
            .range(
                deps.storage,
                start_after,
                None,
                cosmwasm_std::Order::Ascending,
            )
            .filter(|si| {
                si.as_ref()
                    .map(|(_, si)| {
                        if matches!(&owner, Some(owner) if si.owner != *owner) {
                            return false;
                        }

                        if !include_unstaking && si.unstake_at.is_some() {
                            return false;
                        }

                        true
                    })
                    .unwrap_or(true)
            })
            .map(|si| {
                si.map(|(token_id, si)| StakeInfoResp {
                    token_id,
                    owner: si.owner,
                    unstaking: si.unstake_at.and_then(|ex| match ex {
                        Expiration::AtTime(t) => Some(t.nanos().into()),
                        _ => None,
                    }),
                })
            })
            .take(limit)
            .collect::<Result<_, StdError>>()?;

        Ok(AllStakedResp { nfts })
    }
}

impl Default for Distribution<'_> {
    fn default() -> Self {
        Self::new()
    }
}
