use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Decimal, Uint64};

#[cw_serde]
pub struct DistributionInstantiate {
    pub denom: String,
    pub unstake_period: Uint64,
    pub collection: String,
    pub color: String,
    pub part: Decimal,
}

#[cw_serde]
pub struct InstantiateData {
    pub part: Decimal,
    pub color: String,
}

#[cw_serde]
pub enum DistributionExec {
    Distribute {},
}
