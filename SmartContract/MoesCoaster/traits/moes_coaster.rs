use crate::libs::errors::AznsRouterError;
use crate::libs::errors::BeerTapErr;
use ink::prelude::string::String;
use ink::primitives::AccountId;
#[ink::trait_definition]
pub trait MoesCoaster {
    #[ink(message)]
    fn get_ipfs_link(&self) -> String;

    #[ink(message, payable)]
    fn participate_scratch_card(&mut self, random_number: u8) -> Result<u128, self::BeerTapErr>;

    #[ink(message, payable)]
    fn feed_me(&self);

    #[ink(message)]
    fn puke_it(&self, value: u128) -> bool;

    #[ink(message)]
    fn generate_random_number(&mut self, max_value: u8) -> u8;

    #[ink(message)]
    fn feed_me_randomly(&mut self) -> Result<u128, self::BeerTapErr>;

    #[ink(message)]
    fn divide_by_100(&self, value: u128) -> Result<u128, self::BeerTapErr>;

    #[ink(message)]
    fn get_address(
        &self,
        router_addr: AccountId,
        domain: String,
    ) -> Result<AccountId, AznsRouterError>;

    #[ink(message)]
    fn change_owner(&mut self, new_owner: AccountId);
}
