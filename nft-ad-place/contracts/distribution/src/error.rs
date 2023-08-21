use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),
    #[error("No NFTs staked, noone to distribute to")]
    NoNfts,
    #[error("Invalid NFT collection: {0}")]
    InvalidCollection(String),
    #[error("Invalid NFT color: {0}")]
    InvalidColor(String),
    #[error("Caller unauthorized for this call")]
    Unauthorized,
    #[error("No staker entry for {0}")]
    NoStakerEntry(String),
    #[error("Not requested for unstaking")]
    NoUnstakeRequested,
    #[error("To early to unstake")]
    UnstakePeriodOngoing,
}
