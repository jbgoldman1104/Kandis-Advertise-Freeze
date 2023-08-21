use cosmwasm_schema::cw_serde;

/// Extension of cw721 token - only data we are interested in (nft attributes)
#[cw_serde]
pub struct Extension {
    attributes: Vec<Attribute>,
}

/// NFT attribute
#[cw_serde]
pub struct Attribute {
    /// Trait type - technically we are interested only in `Color`, and there is probably very
    /// limited number of them, but for sake of not having any parsing issues - deserialized as
    /// string and then compared.
    trait_type: String,
    /// Attribute value
    value: String,
}

impl Extension {
    /// Returns NFT color by parsing attributes
    pub fn color(&self) -> Option<&str> {
        self.attributes.iter().find_map(|attr| {
            if attr.trait_type == "Color" {
                Some(attr.value.as_str())
            } else {
                None
            }
        })
    }
}
