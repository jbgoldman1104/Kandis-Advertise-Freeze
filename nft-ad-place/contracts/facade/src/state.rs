use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Binary, Coin, Decimal};
use cw_utils::{Duration, Expiration};

#[cw_serde]
pub struct SplitPart {
    pub addr: Addr,
    pub part: Decimal,
}

#[cw_serde]
pub struct PricingVariant {
    pub threshold: Coin,
    pub duration: Duration,
}

#[cw_serde]
pub struct DistributionContracts {
    pub bronze: SplitPart,
    pub silver: SplitPart,
    pub gold: SplitPart,
}

#[cw_serde]
pub struct Config {
    pub split: Vec<SplitPart>,
    pub pricing: Vec<PricingVariant>,
    pub admin: Addr,
    pub distribution_contracts: DistributionContracts,
}

#[cw_serde]
pub struct Purchase {
    pub url: String,
    pub description: String,
    pub website: String,
    pub data: Binary,
    pub expiration: Expiration,
}
