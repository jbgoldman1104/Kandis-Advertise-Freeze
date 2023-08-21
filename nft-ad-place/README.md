# Advertising platform Smart Contracts

## Design

The main use case is to provide possibility to pay for ad-space via the Smart
Contract. Payment is provided via *Facade* contract, which splits it to proper
contracts.

By design the split is:

* 20% ecosystem
* 16.67% burned
* 16.67% CP
* 16.67% OP
* 30% holders

However the split can be configured putting on the *Facade* instantiation.

`holders` is a special case, handled by *Distribution* contract. In fact, those
are three separated instantions of the *Distribution* contract: one for bronze
NFT holders, one for silver NFT holders, and the final one for gold NFT
holders.

*Distribution* contract is designed to distribute tokens send to it across
stakers of particular NFTs using the `cw2222` interface.

Distribution contract provides also an API allowing for staking the contract
for future rewards.

Additionally the *Facade* contract keeps data about the ad which are paid:

* Ad address (URI)
* Description
* Website link
* Potential additional base64 encoded data
* Expiration time

## Building contracts

All contracts are structured in cosmwasm workspace way. It makes it very
easy to build them using
[Rust optimizer](https://github.com/CosmWasm/rust-optimizer). To do so, run:

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.12
```

in the repository root. It should create an `artifacts` folder on your machine,
containing `*.wasm` files - smart contracts ready to be uploaded.

## Facade contract

### Instantiation message

```json
{
    "split": [{
        "addr": "ecosystem_addr",
        "part": "0.2"
    }, {
        "addr": "CP_addr",
        "part": "0.1667"
    }, {
        "addr": "OP_addr",
        "part": "0.1667"
    }, {
        "addr": "BURN_addr",
        "part": "0.1667"
    }],
    "holders_split": {
        "gold": "0.1",
        "silver": "0.1",
        "bronze": "0.1"
    },
    "pricing": [{
        "amount": "100",
        "denom": "atom",
        "duration": "86400"
    }, {
        "amount": "200",
        "denom": "atom",
        "duration": "17280"
    }],
    "admin": "admin_addr",
    "unstake_period": "17280"
    "collection": "nft_collection_addr",
    "distribution_code_id": "53"
}
```

The `split` field defines contracts to split payemts between. Every contract
listed here receives part defined by the `part` field.

The `holders_split` object contains additional distribution info - how much
tokens shall be send to holders of particular NFT classes.

All entries in `split` and `holders_split` has to add at most to `1.0` - if
they exceed this amount, instantiation will fail. If they sum to less, exceed
tokens would be burned.

The `pricing` field defined pricing options for the contract. It contains price
in native denom (`amount` + `denom`), and the duration this plan extends the
expiration of and ad. All pricing plans has to come with the exact same denom.

The `price` field defines minimal amount of tokens to be send for renting the
ad-space. If less tokens are send with payment message, the payment would fail.

The `expiration` field defines how much the payment increases the expiration
time of a particular ad info.

The `admin` field defines an `admin` account - the only one allowed to
reconfigure the contract and remove any ad entry before its expiration.

The `collection` is an address of collection which can be used for staking.

The "distibution_code_id" is the code if of the distribution contract.

At the instantiation, contract instantiates three *Distribution* contracts -
one per NFT class. Distribution contracts 

### Execution messages

#### Update splits

Callable by a contract admin only.

```json
{
    "update_split": {
        "split": [{
            "addr": "ecosystem_addr",
            "part": "0.2"
        }, {
            "addr": "CP_addr",
            "part": "0.1667"
        },
        {
            "addr": "OP_addr",
            "part": "0.1667"
        }],
        "holders_split": {
            "gold": "0.1",
            "silver": "0.1",
            "bronze": "0.1"
        }
    }
}
```

Updates how tokens are distributed. See: `Instantiate`.

#### Update pricing

Callable by a contract admin only.

```json
{
    "update_pricing": {
        "pricing": [{
            "amount": "100",
            "denom": "atom",
            "duration": "86400"
        }, {
            "amount": "200",
            "denom": "atom",
            "duration": "17280"
        }]
    }
}
```

Updates pricing info.

#### Update Admin

Callable by a contract admin only.

```json
{
    "update_admin": {
        "admin": "admin_addr"
    }
}
```

Changes contract admin.

#### Purchase

Purchases Ad space.

```json
{
    "purchase": {
        "id": "purchase_id",
        "url": "ad_image_uri",
        "description": "Ad description",
        "website": "Ad website",
        "data": "base64 encoded data"
    }
}
```

Purchases an ad space. The `purchase_id` is unique id for the sender address.
`url`, `description` and `data` are addiotional data about this purchase - the
ad image url, some description, owner website. `data` is additional base64
encoded data for any protocol usage.

All `url`, `description`, `website` and `data` are optional, if the given `id`
purchase already exist for given address. In such case the rent is prolonged,
and any of those fields - if passed, overwrites the value there.

The time of purchase expiration is calculated basing on the amount of tokens
send. The highest payment plan is chosen and its `duration` is used. If there
are not enough tokens send for the shortest plan, the call fails.

Purchase call will immediately split all the tokens accumulated on this
contract according to its `split` definition.

#### Cancel ad

Callable only by admin or purchase owner.

```json
{
    "cancel_ad": {
        "owner": "owner_addr",
        "id": "purchase_id"
    }
}
```

Cancells purchase with given `id` by given owner. The `owner` field is optional
and intender to use only by admin, as it allows for cancellation of unowned
purchase. If `owner` is not provided, it is defaulted to sender.

### Queries

#### Ad info

```json
{
    "ad_info" : {
        "owner": "owner_addr",
        "id": "purchase_id"
    }
}
```

Gives back info about the given purchase, returns:

```json
{
    "owner": "owner_addr",
    "id": "purchase_id",
    "url": "ad_image_uri",
    "description": "Ad description",
    "website": "Ad website",
    "data": "base64 encoded data",
    "expires": "1678223869",
    "expired": false
}
```

`expires` is Unix Time timestapm when purchase expires, and `expired` is
information if purchase is already expired.

#### Ads info

{
    "ads_info": {
        "start_after": {
            "owner": "owner_addr",
            "id": "purchase_id"
        },
        "limit": 5,
        "include_expired": false
    }
}

Paginated access to all adds in the protocol. Optional `start_after` is last
ite, returned by pagination (so one after to start pagination). Optional
`limit` is upper bound of how much results to return.

`include_expired` is a flag determining if expired purchases should also be
included (optional, `false` by default).

#### User ads info

```json
{
    "user_ads_info": {
        "owner": "owner_addr",
        "start_after": "urchase_id",
        "limit": 5,
        "include_expired": false
    }
}
```

Equivalent of `ads_info`, but paginages over single user ads.

#### Distribution contracts

```json
{
    "distribution_contracts": {}
}
```

Returns addresses of distribution contracts, in a structure:

```json
{
    "gold": "gold_addr",
    "silver": "silver_addr",
    "bronze": "bronze_addr"
}
```

## Distribution contract

Distribution contract distributes tokens received between NFTs holders.

### Instantiate

This is intended to be called only by the *Facade* contract.

```json
{
    "denom": "ustar",
    "unstake_period": "17280",
    "collection": "nft_collection_addr",
    "color": "color"
}
```

The `denom` is the denom which can be distributed via this contract.
`unstake_period` and `collection` are forwarded from *Facade* instantiation.

The `color` is the "Color" attribtue of the token which are stackable on this
contract.

### Execution

#### Distribute

This message can be technically called by anyone, but is expected to be called
by the *Facade* only.

```json
{
    "distribute": {}
}
```

Immediatelly distributes all allocated funds (including just sent) of denom
this contract operates on to holders.

#### Receive NFT

```json
{
    "receive_nft": {
        "sender": "sender_addr",
        "token_id": "nft_id",
        "msg": ""
    }
}
```

Receives the NFT and immediatelly stakes it. Accepts only NFTs from given
collection, and only if its `Color` attribute matches one of this contract.

#### Request unstake

```json
{
    "request_unstake": {
        "token_id": "nft_id"
    }
}
```

Request unstaking given NFT. Has to be called by user who previously staked
this token. The token would become available after `unstake_period` seconds.

#### Unstake

```json
{
    "unstake": {
        "token_id": "nft_id",
        "receiver": "receiver_addr",
    }
}
```

Unstakes NFT if unstake period passed. `receiver` is optional, and if set it
determines where the NFT would be transfered (by default - whoever staked it,
so message sender).

#### Withdraw

```json
{
    "withdraw": {
        "receiver": "receiver_addr"
    }
}
```

Withdraws any funds accumulated for message sender. `receiver` is optional, and
defines where tokens are send - defaulted to the message sender.

### Queries

#### All staked

```json
{
    "all_staked": {
        "start_after": "token_id",
        "limit": 5,
        "owner": "owner_addr",
        "include_unstaking": true.
    }
}
```

Paginated query for all staked NFTs. `include_usntaking` allows to discard
tokens in unstaking period, defaulted to `true`. `Owner` field is optional,
and allows to return only items staked by given address.

Returns list of objects:

```json
{
    "token_id": "token_id",
    "onwer": "staker_addr",
    "unstaking": "1678223869"
}
```

`owner` is info who staked this token, `unstaking` field is optional and will
exist only, if token is in unstaking period - it will contain Unix Timestamp
when token can be unstaked.

#### Weight

```json
{
    "weight": {
        "hodler": "holder_addr"
    }
}
```

Returns distribution weight of given user, meaning the number of tokens
he stakes. It additionally returns total weights of all users (so number
of all tokens staked).

```json
{
    "weight": {
        "user": 12,
        "total": 257
    }
}
```

#### All weights

```json
{
    "all_weights": {
        "start_after": "last_addr",
        "limit": 5
    }
}
```

Paginated view into holders weights. Returns list of:

```json
{
    "addr": "holder_address",
    "weight": 13
}
```

#### Pending withdrawal

```json
{
    "pending_withdrawal": {
        "addr": "holder_addr"
    }
}
```

Returns how much given holder can withdraw from this contract. Returns:

```json
{
    "amount": "124",
    "denom": "ustar"
}
```

#### All pending withdrawals

```json
{
    "start_after": "addr",
    "limit": 5
}
```

Paginated view into withdrawals pending. Returns list of structures as in
`pending_withdrawal`.
