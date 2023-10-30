use crate::libs::errors::AznsRouterError;
use ink::prelude::string::String;
use ink::prelude::vec::Vec;
use ink::primitives::AccountId;

#[ink::trait_definition]
pub trait AznsContract {
    #[ink(message, selector = 0xe6da7bf0)]
    fn get_all_registries(&self) -> Vec<AccountId>;

    #[ink(message, selector = 0x15a5d20a)]
    fn get_registry(&self, tld: String) -> Option<AccountId>;

    #[ink(message, selector = 0xd259f7ba)]
    fn get_address(&self, domain: String) -> Result<AccountId, AznsRouterError>;

    #[ink(message, selector = 0xdf3a358e)]
    fn get_primary_domains(
        &self,
        account: AccountId,
        tld: Option<String>,
    ) -> Vec<(AccountId, String)>;
}
