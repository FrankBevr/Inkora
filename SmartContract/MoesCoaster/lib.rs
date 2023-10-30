#![cfg_attr(not(feature = "std"), no_std, no_main)]

mod azns_router;

#[ink::contract]
mod moes_coaster {
    use crate::azns_router::AznsContract;
    use crate::azns_router::Error;
    use ink::env::hash;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use scale::{Decode, Encode};

    /*
     * Errors
     * */
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

    /*
     * Data
     * */
    #[ink(storage)]
    pub struct MoesCoaster {
        ipfs_link: String,
        salt: u64,
        owner: AccountId,
    }

    #[derive(scale::Encode, scale::Decode, PartialEq)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout, Debug)
    )]
    pub enum AccountIdOrDomain {
        AccountId(AccountId),
        Domain(String),
    }

    /*
     * Implentations
     * */
    impl MoesCoaster {
        // Instaniate with stupid values
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                ipfs_link: "ipfs://abc".into(),
                salt: 0,
                owner: Self::env().caller(),
            }
        }

        // Get 3D Model
        #[ink(message)]
        pub fn get_ipfs_link(&self) -> String {
            self.ipfs_link.clone()
        }

        //  main function
        #[ink(message, payable)]
        pub fn participate_scratch_card(
            &mut self,
            random_number: u8,
        ) -> Result<u128, self::BeerTapErr> {
            let random_number = self.generate_random_number(random_number);
            if random_number % 2 == 0 {
                let contract_feeded_value = self.env().transferred_value();
                Ok(contract_feeded_value)
            } else {
                let caller_feeded_value = self.env().balance();
                let _ = self
                    .env()
                    .transfer(self.env().caller(), self.env().balance());
                Ok(caller_feeded_value)
            }
        }

        // Journey function to transfer money to contract
        #[ink(message, payable)]
        pub fn feed_me(&self) {
            if self.owner == self.env().caller(){
                let _ = self.env().transferred_value();
            }
        }

        // Journey function to transfer money from contract to caller
        #[ink(message)]
        pub fn puke_it(&self, value: Balance) -> bool {
            assert!(value <= self.env().balance(), "insufficient funds!");
            let _ = self.env().transfer(self.env().caller(), value);
            true
        }

        // Journey function create randomness
        #[ink(message)]
        pub fn generate_random_number(&mut self, max_value: u8) -> u8 {
            let seed = self.env().block_timestamp();
            let mut input: Vec<u8> = Vec::new();
            input.extend_from_slice(&seed.to_be_bytes());
            input.extend_from_slice(&self.salt.to_be_bytes());
            let mut output = <hash::Keccak256 as hash::HashOutput>::Type::default();
            ink::env::hash_bytes::<hash::Keccak256>(&input, &mut output);
            self.salt += 1;
            let number = output[0] % (max_value + 1);
            number
        }

        // Journey function combine randomness, feeding  and puking
        #[ink(message, payable)]
        pub fn feed_me_randomly(&mut self) -> Result<u128, self::BeerTapErr> {
            let transfered_food = self.env().transferred_value();

            // Generate random number, instantiate 20%, instantiate 80%
            let random_number = self.generate_random_number(10);
            let random_number_80: u128 = u128::from(random_number) * 80;
            let random_number_20: u128 = u128::from(random_number) * 20;

            // Calculate contract_food value 20%
            let contract_food_20 = match transfered_food.checked_mul(random_number_20) {
                Some(transfered_food_20) => transfered_food_20,
                None => return Err(self::BeerTapErr::LowCostHandle),
            };
            let contract_food_div_100 = match self.divide_by_100(contract_food_20) {
                Ok(contract_food_20_div_100) => contract_food_20_div_100,
                Err(err) => return Err(err),
            };
            let contract_food = contract_food_div_100;

            // Calculate caller value 80%, which get sends back
            let transfered_food_80 = match transfered_food.checked_mul(random_number_80) {
                Some(transfered_food_80) => transfered_food_80,
                None => return Err(self::BeerTapErr::LowCostHandle),
            };
            let transfered_food_80_div_100 = match self.divide_by_100(transfered_food_80) {
                Ok(transfered_food_80_div_100) => transfered_food_80_div_100,
                Err(err) => return Err(err),
            };
            let caller_food_back = transfered_food_80_div_100;

            // send 80% back to caller
            let _ = self.env().transfer(self.env().caller(), caller_food_back);

            // return value of the contract is feeded.
            Ok(contract_food)
        }

        // Journey function to calcuclate percentage without using devision
        #[ink(message)]
        pub fn divide_by_100(&self, value: u128) -> Result<u128, self::BeerTapErr> {
            let high_bits = value >> 64;
            let low_bits = value & ((1 << 64) - 1);
            let percentage_value = match high_bits.checked_div(100) {
                Some(h) => match h.checked_shl(64) {
                    Some(h_shifted) => match low_bits.checked_div(100) {
                        Some(l) => h_shifted + l,
                        None => 0,
                    },
                    None => 0,
                },
                None => 0,
            };
            Ok(percentage_value)
        }

        #[ink(message)]
        pub fn get_address(
            &self,
            router_addr: AccountId,
            domain: String,
        ) -> Result<AccountId, Error> {
            // Can also store it in contract storage
            let router: ink::contract_ref!(AznsContract) = router_addr.into();

            router.get_address(domain)
        }

        #[ink(message)]
        pub fn change_owner(&mut self, new_owner: AccountId) {
            if self.owner == self.env().caller(){
                self.owner = new_owner;
            }
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        /*
         * Unit Tests
         */
        #[ink::test]
        fn get_ipfs_link() {
            let moes_coaster = MoesCoaster::new();
            assert_eq!(moes_coaster.get_ipfs_link(), "ipfs://abc");
        }

        #[ink::test]
        fn puke_it() {
            // set up
            let contract_balance = 100;
            let accounts = default_accounts();
            let moes_coaster = create_contract(contract_balance);

            // when
            set_sender(accounts.eve);
            set_balance(accounts.eve, 0);
            moes_coaster.puke_it(80);

            // then
            assert_eq!(get_balance(accounts.eve), 80);
        }

        #[test]
        fn generate_random_number() {
            let mut contract = MoesCoaster::new();
            for max_value in 1..=100 {
                let result = contract.generate_random_number(max_value);
                assert!(result <= max_value);
            }
        }

        /*
         * Utilities for Testing
         */
        fn create_contract(initial_balance: Balance) -> MoesCoaster {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            set_balance(contract_id(), initial_balance);
            MoesCoaster::new()
        }

        fn contract_id() -> AccountId {
            ink::env::test::callee::<ink::env::DefaultEnvironment>()
        }

        fn set_sender(sender: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }

        fn default_accounts() -> ink::env::test::DefaultAccounts<ink::env::DefaultEnvironment> {
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>()
        }
        fn set_balance(account_id: AccountId, balance: Balance) {
            ink::env::test::set_account_balance::<ink::env::DefaultEnvironment>(account_id, balance)
        }

        fn get_balance(account_id: AccountId) -> Balance {
            ink::env::test::get_account_balance::<ink::env::DefaultEnvironment>(account_id)
                .expect("Cannot get account balance")
        }
    }
}
