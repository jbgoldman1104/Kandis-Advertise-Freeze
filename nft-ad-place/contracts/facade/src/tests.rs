use cosmwasm_std::Addr;
use distribution::contract::multitest_utils::DistributionCodeId;
use sylvia::multitest::App;

#[test]
fn system_instantiation() {
    let app = App::default();

    let owner = Addr::unchecked("owner");

    let distribution_code_id = DistributionCodeId::store_code(&mut app);
}
