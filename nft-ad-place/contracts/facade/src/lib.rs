#![allow(clippy::too_many_arguments)]

pub mod contract;
mod distribution;
pub mod error;
pub mod msg;
pub mod responses;
mod state;
#[cfg(test)]
mod tests;

#[cfg(not(feature = "library"))]
mod entry_points {
    use crate::contract::{ContractExecMsg, ContractQueryMsg, Facade, InstantiateMsg};
    use crate::error::ContractError;
    use cosmwasm_std::{entry_point, Binary, Deps, DepsMut, Env, MessageInfo, Reply, Response};

    const CONTRACT: Facade<'static> = Facade::new();

    #[entry_point]
    pub fn instantiate(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        msg: InstantiateMsg,
    ) -> Result<Response, ContractError> {
        msg.dispatch(&CONTRACT, (deps, env, info))
    }

    #[entry_point]
    pub fn execute(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        msg: ContractExecMsg,
    ) -> Result<Response, ContractError> {
        msg.dispatch(&CONTRACT, (deps, env, info))
    }

    #[entry_point]
    pub fn query(deps: Deps, env: Env, msg: ContractQueryMsg) -> Result<Binary, ContractError> {
        msg.dispatch(&CONTRACT, (deps, env))
    }

    #[entry_point]
    pub fn reply(deps: DepsMut, env: Env, reply: Reply) -> Result<Response, ContractError> {
        CONTRACT.reply(deps, env, reply)
    }
}

#[cfg(not(feature = "library"))]
pub use entry_points::*;
