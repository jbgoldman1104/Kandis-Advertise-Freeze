use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Decimal, Uint64};

#[cw_serde]
pub struct InstantiateData {
    pub part: Decimal,
    pub color: String,
}

#[cw_serde]
pub struct StakeInfoResp {
    pub token_id: String,
    pub owner: Addr,
    pub unstaking: Option<Uint64>,
}

#[cw_serde]
pub struct AllStakedResp {
    pub nfts: Vec<StakeInfoResp>,
}
