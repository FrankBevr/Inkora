#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod moes_coaster {
    use ink::env::hash;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct MoesCoaster {
        ipfs_link: String,
        money: u128,
        salt: u64,
    }

    impl MoesCoaster {
        // Instaniate with stupid values
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                ipfs_link: "ipfs://abc".into(),
                money: 0,
                salt: 0,
            }
        }

        // Get 3D Model
        #[ink(message)]
        pub fn get_ipfs_link(&self) -> String {
            self.ipfs_link.clone()
        }

        //  main function
        #[ink(message)]
        pub fn participate_scratch_card(&self, random_number: u8) -> u8 {
            random_number
        }

        // Journey function to transfer money to contract
        #[ink(message, payable)]
        pub fn feed_me(&self) {
            let _ = self.env().transferred_value();
        }

        // Journey function to transfer money from contract to caller
        #[ink(message)]
        pub fn puke_it(&self, value: Balance) -> bool {
            ink::env::debug_println!("requested value: {}", value);
            ink::env::debug_println!("contract balance: {}", self.env().balance());

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

        // Journey function combine randomness and feeding
        #[ink(message)]
        pub fn feed_me_randomly(&mut self) -> bool {
            let random_number = self.generate_random_number(10);
            ink::env::debug_println!("thats my random number: {}", random_number);
            true
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
