use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};
use cw_utils::{Duration, Expiration};

use crate::i128::Int128;

#[cw_serde]
pub struct Config {
    /// Denom distributed by this contract
    pub denom: String,
    /// Time needed to pass between `RequestUnstake` and `Unstake` calls in seconds
    pub unstake_period: Duration,
    /// Collection from which NFTs shall be staken
    pub collection: Addr,
    /// `color` attribute of NFTs to be staken
    pub color: String,
}

#[cw_serde]
pub struct State {
    /// How much points is worth a single weight point (NFT staken)
    pub points_per_weight: Uint128,
    /// Points which were not previously distributed
    pub points_leftover: Uint128,
    /// Total withdrawable tokens
    pub withdrawable_total: Uint128,
    /// Total weight - count of staken NFTs (not in unstaking period)
    pub total_weight: u64,
}

#[cw_serde]
pub struct Staker {
    /// Points shift for this staker
    pub points_correction: Int128,
    /// Funds already withdrawn by this staker
    pub withdrawn_funds: Uint128,
    /// This staker weight (number of staked NFTs not in unstaking process)
    pub weight: u64,
}

#[cw_serde]
pub struct StakeInfo {
    /// Initial owner of the staked NFT
    pub owner: Addr,
    /// When NFT can be unstaken? `None` if not in unstaking process
    pub unstake_at: Option<Expiration>,
}
