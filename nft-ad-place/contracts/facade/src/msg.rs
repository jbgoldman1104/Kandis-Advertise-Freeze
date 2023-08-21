use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Decimal, Uint128, Uint64};

#[cw_serde]
pub struct SplitItem {
    pub addr: String,
    pub part: Decimal,
}

#[cw_serde]
pub struct HoldersSplit {
    pub gold: Decimal,
    pub silver: Decimal,
    pub bronze: Decimal,
}

#[cw_serde]
pub struct Pricing {
    pub amount: Uint128,
    pub denom: String,
    pub duration: Uint64,
}

#[cw_serde]
pub struct AdsInfoStartAfter {
    pub owner: String,
    pub id: String,
}
