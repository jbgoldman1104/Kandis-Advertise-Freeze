use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Binary, Uint64};

#[cw_serde]
pub struct AdInfo {
    pub owner: Addr,
    pub id: String,
    pub url: String,
    pub description: String,
    pub website: String,
    pub data: Binary,
    pub expires: Uint64,
    pub expired: bool,
}

#[cw_serde]
pub struct AdsInfo {
    pub ads: Vec<AdInfo>,
}

#[cw_serde]
pub struct DistributionContractsInfo {
    pub gold: Addr,
    pub silver: Addr,
    pub bronze: Addr,
}
