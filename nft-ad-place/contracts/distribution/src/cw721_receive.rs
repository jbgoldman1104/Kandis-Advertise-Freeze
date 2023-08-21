use cosmwasm_std::{
    ensure, Addr, Binary, DepsMut, Env, MessageInfo, Response, StdError, StdResult, Uint128,
};
use cw721::{Cw721QueryMsg, NftInfoResponse};
use sylvia::{contract, interface, schemars};

use crate::contract::Distribution;
use crate::error::ContractError;
use crate::nft::Extension;
use crate::state::{StakeInfo, Staker};

#[interface]
pub trait Cw721Receive {
    type Error: From<StdError>;

    #[msg(exec)]
    fn receive_nft(
        &self,
        ctx: (DepsMut, Env, MessageInfo),
        sender: String,
        token_id: String,
        msg: Binary,
    ) -> Result<Response, Self::Error>;
}

#[contract]
impl Cw721Receive for Distribution<'_> {
    type Error = ContractError;

    fn receive_nft(
        &self,
        (deps, _env, info): (DepsMut, Env, MessageInfo),
        sender: String,
        token_id: String,
        _msg: Binary,
    ) -> Result<Response, Self::Error> {
        let config = self.config.load(deps.storage)?;

        ensure!(
            config.collection == info.sender,
            ContractError::InvalidCollection(info.sender.into())
        );

        let info: NftInfoResponse<Extension> = deps.querier.query_wasm_smart(
            info.sender.to_string(),
            &Cw721QueryMsg::NftInfo {
                token_id: token_id.clone(),
            },
        )?;

        let color = info.extension.color().unwrap_or_default();

        ensure!(
            config.color == color,
            ContractError::InvalidColor(color.to_owned())
        );

        // New NFT staken - increase total weight
        let mut state = self.state.load(deps.storage)?;
        state.total_weight += 1;
        self.state.save(deps.storage, &state)?;
        let ppw = state.points_per_weight.u128() as i128;

        let sender = Addr::unchecked(sender);

        // Update points correction and weight for staker
        self.stakers
            .update(deps.storage, &sender, |staker| -> StdResult<_> {
                match staker {
                    Some(Staker {
                        points_correction,
                        withdrawn_funds,
                        weight,
                    }) => Ok(Staker {
                        points_correction: (i128::from(points_correction) - ppw).into(),
                        withdrawn_funds,
                        weight: weight + 1,
                    }),
                    None => Ok(Staker {
                        points_correction: (-ppw).into(),
                        withdrawn_funds: Uint128::zero(),
                        weight: 1,
                    }),
                }
            })?;

        // Add staken NFT
        self.nfts.save(
            deps.storage,
            &token_id,
            &StakeInfo {
                owner: sender.clone(),
                unstake_at: None,
            },
        )?;

        let resp = Response::new()
            .add_attribute("action", "receive_nft")
            .add_attribute("token_id", token_id)
            .add_attribute("staker", sender);

        Ok(resp)
    }
}
