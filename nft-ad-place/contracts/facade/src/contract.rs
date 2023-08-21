use crate::distribution::{DistributionExec, DistributionInstantiate, InstantiateData};
use crate::error::ContractError;
use crate::msg::{AdsInfoStartAfter, HoldersSplit, Pricing, SplitItem};
use crate::responses::{AdInfo, AdsInfo, DistributionContractsInfo};
use crate::state::{Config, DistributionContracts, PricingVariant, Purchase, SplitPart};
use cosmwasm_std::{
    coin, coins, ensure, from_binary, to_binary, Addr, BankMsg, Binary, CosmosMsg, Decimal, Deps,
    DepsMut, Env, MessageInfo, Reply, Response, StdError, SubMsg, Uint128, Uint64, WasmMsg,
};
use cw_storage_plus::{Bounder, Item, Map};
use cw_utils::{parse_instantiate_response_data, Duration, Expiration};
use sylvia::{contract, schemars};

const DIST_INSTANTIATE_CODE_ID: u64 = 1;
const COLOR_BRONZE: &str = "Bronze";
const COLOR_SILVER: &str = "Silver";
const COLOR_GOLD: &str = "Golden";

const PAGINATION_LIMIT_DEFAULT: u32 = 10;
const POGINATION_LIMIT_MAX: u32 = 40;

const CONTRACT_NAME: &str = "ad-market:facade";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

fn clip_limit(limit: Option<u32>) -> usize {
    limit
        .unwrap_or(PAGINATION_LIMIT_DEFAULT)
        .min(POGINATION_LIMIT_MAX) as _
}

pub struct Facade<'a> {
    config: Item<'a, Config>,
    purchases: Map<'a, (&'a Addr, &'a str), Purchase>,
}

#[contract(error = ContractError)]
impl Facade<'_> {
    pub const fn new() -> Self {
        Self {
            config: Item::new("config"),
            purchases: Map::new("purchases"),
        }
    }

    #[msg(instantiate)]
    pub fn instantiate(
        &self,
        (deps, env, _info): (DepsMut, Env, MessageInfo),
        split: Vec<SplitItem>,
        holders_split: HoldersSplit,
        pricing: Vec<Pricing>,
        admin: String,
        unstake_period: Uint64,
        collection: String,
        distribution_code_id: Uint64,
    ) -> Result<Response, ContractError> {
        cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

        let split = split
            .into_iter()
            .map(|item| -> Result<_, ContractError> {
                let addr = deps.api.addr_validate(&item.addr)?;

                Ok(SplitPart {
                    addr,
                    part: item.part,
                })
            })
            .collect::<Result<_, _>>()?;

        ensure!(!pricing.is_empty(), ContractError::NoPricing);
        ensure!(
            pricing[1..]
                .iter()
                .all(|price| price.denom == pricing[0].denom),
            ContractError::MultipleDenoms
        );

        let denom = pricing[0].denom.clone();

        let mut pricing: Vec<_> = pricing
            .into_iter()
            .map(|price| PricingVariant {
                threshold: coin(price.amount.u128(), &price.denom),
                duration: Duration::Time(price.duration.u64()),
            })
            .collect();

        pricing.sort_by_key(|price| price.threshold.amount);

        let config = Config {
            split,
            pricing,
            admin: deps.api.addr_validate(&admin)?,
            distribution_contracts: DistributionContracts {
                bronze: SplitPart {
                    addr: Addr::unchecked(""),
                    part: Decimal::zero(),
                },
                silver: SplitPart {
                    addr: Addr::unchecked(""),
                    part: Decimal::zero(),
                },
                gold: SplitPart {
                    addr: Addr::unchecked(""),
                    part: Decimal::zero(),
                },
            },
        };
        self.config.save(deps.storage, &config)?;

        let bronze_instantiate = DistributionInstantiate {
            denom: denom.clone(),
            unstake_period,
            collection: collection.clone(),
            color: COLOR_BRONZE.to_owned(),
            part: holders_split.bronze,
        };
        let bronze_instantiate = WasmMsg::Instantiate {
            admin: Some(env.contract.address.to_string()),
            code_id: distribution_code_id.u64(),
            msg: to_binary(&bronze_instantiate)?,
            funds: vec![],
            label: "Bronze poll".to_string(),
        };
        let bronze_instantiate =
            SubMsg::reply_on_success(bronze_instantiate, DIST_INSTANTIATE_CODE_ID);

        let silver_instantiate = DistributionInstantiate {
            denom: denom.clone(),
            unstake_period,
            collection: collection.clone(),
            color: COLOR_SILVER.to_owned(),
            part: holders_split.silver,
        };
        let silver_instantiate = WasmMsg::Instantiate {
            admin: Some(env.contract.address.to_string()),
            code_id: distribution_code_id.u64(),
            msg: to_binary(&silver_instantiate)?,
            funds: vec![],
            label: "Silver poll".to_string(),
        };
        let silver_instantiate =
            SubMsg::reply_on_success(silver_instantiate, DIST_INSTANTIATE_CODE_ID);

        let gold_instantiate = DistributionInstantiate {
            denom,
            unstake_period,
            collection,
            color: COLOR_GOLD.to_owned(),
            part: holders_split.gold,
        };
        let gold_instantiate = WasmMsg::Instantiate {
            admin: Some(env.contract.address.to_string()),
            code_id: distribution_code_id.u64(),
            msg: to_binary(&gold_instantiate)?,
            funds: vec![],
            label: "Golden poll".to_string(),
        };
        let gold_instantiate = SubMsg::reply_on_success(gold_instantiate, DIST_INSTANTIATE_CODE_ID);

        let resp = Response::new().add_submessages([
            bronze_instantiate,
            silver_instantiate,
            gold_instantiate,
        ]);

        Ok(resp)
    }

    #[msg(exec)]
    pub fn update_split(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        split: Vec<SplitItem>,
        holders_split: HoldersSplit,
    ) -> Result<Response, ContractError> {
        let mut config = self.config.load(deps.storage)?;

        ensure!(info.sender == config.admin, ContractError::Unauthorized);

        let split: Vec<_> = split
            .into_iter()
            .map(|item| -> Result<_, ContractError> {
                let addr = deps.api.addr_validate(&item.addr)?;

                Ok(SplitPart {
                    addr,
                    part: item.part,
                })
            })
            .collect::<Result<_, _>>()?;

        config.split = split;
        config.distribution_contracts.bronze.part = holders_split.bronze;
        config.distribution_contracts.silver.part = holders_split.silver;
        config.distribution_contracts.gold.part = holders_split.gold;

        self.config.save(deps.storage, &config)?;

        let resp = Response::new().add_attribute("action", "update_split");
        Ok(resp)
    }

    #[msg(exec)]
    pub fn update_pricing(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        pricing: Vec<Pricing>,
    ) -> Result<Response, ContractError> {
        let mut config = self.config.load(deps.storage)?;

        ensure!(info.sender == config.admin, ContractError::Unauthorized);

        let mut pricing: Vec<_> = pricing
            .into_iter()
            .map(|price| PricingVariant {
                threshold: coin(price.amount.u128(), &price.denom),
                duration: Duration::Time(price.duration.u64()),
            })
            .collect();

        pricing.sort_by_key(|price| price.threshold.amount);
        config.pricing = pricing;

        self.config.save(deps.storage, &config)?;

        let resp = Response::new().add_attribute("action", "update_pricing");
        Ok(resp)
    }

    #[msg(exec)]
    pub fn update_admin(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        admin: String,
    ) -> Result<Response, ContractError> {
        let mut config = self.config.load(deps.storage)?;

        ensure!(info.sender == config.admin, ContractError::Unauthorized);

        config.admin = deps.api.addr_validate(&admin)?;
        self.config.save(deps.storage, &config)?;

        let resp = Response::new().add_attribute("action", "update_admin");
        Ok(resp)
    }

    #[msg(exec)]
    pub fn purchase(
        &self,
        (deps, env, info): (DepsMut, Env, MessageInfo),
        id: String,
        url: Option<String>,
        description: Option<String>,
        website: Option<String>,
        data: Option<Binary>,
    ) -> Result<Response, ContractError> {
        let config = self.config.load(deps.storage)?;
        let denom = &config.pricing[0].threshold.denom;
        let amount = info
            .funds
            .into_iter()
            .find(|c| c.denom == *denom)
            .map(|c| c.amount)
            .unwrap_or(Uint128::zero());

        let duration = config
            .pricing
            .iter()
            .find(|pricing| pricing.threshold.amount <= amount)
            .map(|pricing| pricing.duration)
            .ok_or(ContractError::NotEnoughFunds)?;

        let purchase = match self.purchases.may_load(deps.storage, (&info.sender, &id))? {
            Some(purchase) => Purchase {
                url: url.unwrap_or(purchase.url),
                description: description.unwrap_or(purchase.description),
                website: website.unwrap_or(purchase.website),
                data: data.unwrap_or(purchase.data),
                expiration: (purchase.expiration + duration)?,
            },
            None => Purchase {
                url: url.ok_or(ContractError::MissingData)?,
                description: description.ok_or(ContractError::MissingData)?,
                website: website.ok_or(ContractError::MissingData)?,
                data: data.ok_or(ContractError::MissingData)?,
                expiration: duration.after(&env.block),
            },
        };

        self.purchases
            .save(deps.storage, (&info.sender, &id), &purchase)?;

        let funds = deps.querier.query_balance(env.contract.address, denom)?;

        let splits: Vec<_> = config
            .split
            .into_iter()
            .map(|split| (split.addr, split.part * funds.amount))
            .collect();

        let splits_sum: Uint128 = splits.iter().map(|(_, amount)| amount).sum();

        let send_msgs = splits.into_iter().map(|(addr, split)| {
            let msg = BankMsg::Send {
                to_address: addr.to_string(),
                amount: coins(split.u128(), denom),
            };

            CosmosMsg::from(msg)
        });

        let dists = vec![
            (
                config.distribution_contracts.bronze.addr,
                config.distribution_contracts.bronze.part * funds.amount,
            ),
            (
                config.distribution_contracts.silver.addr,
                config.distribution_contracts.silver.part * funds.amount,
            ),
            (
                config.distribution_contracts.gold.addr,
                config.distribution_contracts.gold.part * funds.amount,
            ),
        ];

        let dists_sum: Uint128 = dists.iter().map(|(_, amount)| amount).sum();

        let dists_msgs: Vec<_> = dists
            .into_iter()
            .map(|(addr, split)| -> Result<CosmosMsg<_>, ContractError> {
                let msg = DistributionExec::Distribute {};
                let msg = WasmMsg::Execute {
                    contract_addr: addr.to_string(),
                    msg: to_binary(&msg)?,
                    funds: coins(split.u128(), denom),
                };

                Ok(msg.into())
            })
            .collect::<Result<_, ContractError>>()?;

        let burnout = funds.amount - splits_sum - dists_sum;
        let burn_msg = BankMsg::Burn {
            amount: coins(burnout.u128(), denom),
        };

        let resp = Response::new()
            .add_attribute("action", "purchase")
            .add_attribute("sender", info.sender.to_string())
            .add_attribute("id", id)
            .add_attribute("expiration", purchase.expiration.to_string())
            .add_messages(send_msgs)
            .add_messages(dists_msgs)
            .add_message(burn_msg);

        Ok(resp)
    }

    #[msg(exec)]
    fn cancel_ad(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        owner: Option<String>,
        id: String,
    ) -> Result<Response, ContractError> {
        let owner = owner
            .map(|addr| deps.api.addr_validate(&addr))
            .transpose()?
            .unwrap_or_else(|| info.sender.clone());

        let config = self.config.load(deps.storage)?;

        ensure!(
            owner == info.sender || info.sender == config.admin,
            ContractError::Unauthorized
        );

        self.purchases.remove(deps.storage, (&owner, &id));

        let resp = Response::new()
            .add_attribute("action", "cancel_ad")
            .add_attribute("owner", owner)
            .add_attribute("id", id);

        Ok(resp)
    }

    #[msg(query)]
    pub fn ad_info(
        &self,
        (deps, env): (Deps, Env),
        owner: String,
        id: String,
    ) -> Result<AdInfo, ContractError> {
        let Purchase {
            url,
            description,
            website,
            data,
            expiration,
        } = self
            .purchases
            .load(deps.storage, (&Addr::unchecked(&owner), &id))?;

        let expired = expiration.is_expired(&env.block);

        let expires = match expiration {
            Expiration::AtTime(t) => t.nanos().into(),
            _ => return Err(ContractError::InvalidExpirationFormat),
        };

        let ad_info = AdInfo {
            owner: Addr::unchecked(&owner),
            id,
            url,
            description,
            website,
            data,
            expires,
            expired,
        };

        Ok(ad_info)
    }

    #[msg(query)]
    pub fn ads_info(
        &self,
        (deps, env): (Deps, Env),
        start_after: Option<AdsInfoStartAfter>,
        limit: Option<u32>,
        include_expired: Option<bool>,
    ) -> Result<AdsInfo, ContractError> {
        let limit = clip_limit(limit);
        let include_expired = include_expired.unwrap_or(false);

        let start_after = start_after.map(|sa| (Addr::unchecked(&sa.owner), sa.id));
        let start_after = start_after
            .as_ref()
            .and_then(|(owner, id)| (owner, id.as_str()).exclusive_bound());

        let ad_infos: Vec<_> = self
            .purchases
            .range(
                deps.storage,
                start_after,
                None,
                cosmwasm_std::Order::Ascending,
            )
            .filter(|info| {
                info.as_ref()
                    .map(|(_, info)| !include_expired && info.expiration.is_expired(&env.block))
                    .unwrap_or(true)
            })
            .map(|info| {
                info.map_err(ContractError::from)
                    .and_then(|((addr, id), info)| {
                        let Purchase {
                            url,
                            description,
                            website,
                            data,
                            expiration,
                        } = info;

                        let expired = expiration.is_expired(&env.block);

                        let expires = match expiration {
                            Expiration::AtTime(t) => t.nanos().into(),
                            _ => return Err(ContractError::InvalidExpirationFormat),
                        };

                        let ad_info = AdInfo {
                            owner: Addr::unchecked(&addr),
                            id,
                            url,
                            description,
                            website,
                            data,
                            expires,
                            expired,
                        };

                        Ok(ad_info)
                    })
            })
            .take(limit)
            .collect::<Result<_, _>>()?;

        let info = AdsInfo { ads: ad_infos };
        Ok(info)
    }

    #[msg(query)]
    pub fn user_ads_info(
        &self,
        (deps, env): (Deps, Env),
        owner: String,
        start_after: Option<String>,
        limit: Option<u32>,
        include_expired: Option<bool>,
    ) -> Result<AdsInfo, ContractError> {
        let limit = clip_limit(limit);
        let include_expired = include_expired.unwrap_or(false);

        let owner = Addr::unchecked(&owner);
        let start_after = start_after
            .as_ref()
            .and_then(|sa| sa.as_str().exclusive_bound());

        let ad_infos: Vec<_> = self
            .purchases
            .prefix(&owner)
            .range(
                deps.storage,
                start_after,
                None,
                cosmwasm_std::Order::Ascending,
            )
            .filter(|info| {
                info.as_ref()
                    .map(|(_, info)| !include_expired && info.expiration.is_expired(&env.block))
                    .unwrap_or(true)
            })
            .map(|info| {
                info.map_err(ContractError::from).and_then(|(id, info)| {
                    let Purchase {
                        url,
                        description,
                        website,
                        data,
                        expiration,
                    } = info;

                    let expired = expiration.is_expired(&env.block);

                    let expires = match expiration {
                        Expiration::AtTime(t) => t.nanos().into(),
                        _ => return Err(ContractError::InvalidExpirationFormat),
                    };

                    let ad_info = AdInfo {
                        owner: owner.clone(),
                        id,
                        url,
                        description,
                        website,
                        data,
                        expires,
                        expired,
                    };

                    Ok(ad_info)
                })
            })
            .take(limit)
            .collect::<Result<_, _>>()?;

        let info = AdsInfo { ads: ad_infos };
        Ok(info)
    }

    #[msg(query)]
    pub fn distribution_contracts(
        &self,
        (deps, _env): (Deps, Env),
    ) -> Result<DistributionContractsInfo, ContractError> {
        let config = self.config.load(deps.storage)?;
        let info = DistributionContractsInfo {
            bronze: config.distribution_contracts.bronze.addr,
            silver: config.distribution_contracts.silver.addr,
            gold: config.distribution_contracts.gold.addr,
        };

        Ok(info)
    }

    pub fn reply(&self, deps: DepsMut, _env: Env, reply: Reply) -> Result<Response, ContractError> {
        let resp = reply.result.into_result().map_err(StdError::generic_err)?;

        match reply.id {
            DIST_INSTANTIATE_CODE_ID => {
                let data = resp.data.ok_or(ContractError::MissingResponseData)?;
                let resp = parse_instantiate_response_data(&data)?;
                let data = resp.data.ok_or(ContractError::MissingResponseData)?;
                let data: InstantiateData = from_binary(&data)?;

                let addr = Addr::unchecked(resp.contract_address);

                self.config
                    .update(deps.storage, |mut config| -> Result<_, ContractError> {
                        let split = SplitPart {
                            addr: addr.clone(),
                            part: data.part,
                        };

                        match data.color.as_str() {
                            COLOR_BRONZE => config.distribution_contracts.bronze = split,
                            COLOR_SILVER => config.distribution_contracts.silver = split,
                            COLOR_GOLD => config.distribution_contracts.gold = split,
                            _ => (),
                        }

                        Ok(config)
                    })?;
            }
            id => return Err(ContractError::UnrecognizedReplyId(id)),
        }

        Ok(Response::new())
    }
}
