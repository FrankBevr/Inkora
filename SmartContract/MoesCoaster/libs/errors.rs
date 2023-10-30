use ink::prelude::string::String;
use scale::{Decode, Encode};

#[derive(Debug, PartialEq, Eq, Encode, Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum BeerTapErr {
    LowCostHandle,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum AznsRouterError {
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
