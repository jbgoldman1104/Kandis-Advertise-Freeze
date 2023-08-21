use cosmwasm_std::StdError;
use cw_utils::ParseReplyError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ContractError {
    #[error("{0}")]
    StdError(#[from] StdError),
    #[error("No pricing variants")]
    NoPricing,
    #[error("Multiple denoms on pricing variants")]
    MultipleDenoms,
    #[error("Unrecognized reply id: {0}")]
    UnrecognizedReplyId(u64),
    #[error("Missing response data")]
    MissingResponseData,
    #[error("Invalid instantiation response data: {0}")]
    InvalidResp(#[from] ParseReplyError),
    #[error("Unauthorized for operation")]
    Unauthorized,
    #[error("Not enough funds for any pricing plan")]
    NotEnoughFunds,
    #[error("Missing purchase data")]
    MissingData,
    #[error("Invalid expiration format, only timestamp-based expected")]
    InvalidExpirationFormat,
}
