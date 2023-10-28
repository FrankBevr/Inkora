
    use ink::primitives::AccountId;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    /// Caller is not allowed to call privileged calls.
    NotAdmin,
    /// Not a contract address
    InvalidRegistryAddress,
    /// Given TLD already points to a registry
    TldAlreadyInUse(String),
    /// Given Tld not found
    TldNotFound(String),
    /// Cannot find the resolved address
    CouldNotResolveDomain,
    /// Domain does not contain valid name and/or tld
    InvalidDomainName,
}

#[ink::trait_definition]
pub trait AznsContract {
    #[ink(message, selector = 0xe6da7bf0)]
    fn get_all_registries(&self) -> Vec<AccountId>;

    #[ink(message, selector = 0x15a5d20a)]
    fn get_registry(&self, tld: String) -> Option<AccountId>;

    #[ink(message, selector = 0xd259f7ba)]
    fn get_address(&self, domain: String) -> Result<AccountId, Error>;

    #[ink(message, selector = 0xdf3a358e)]
    fn get_primary_domains(
        &self,
        account: AccountId,
        tld: Option<String>,
    ) -> Vec<(AccountId, String)>;
}

