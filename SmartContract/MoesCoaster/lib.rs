#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod moes_coaster {
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct MoesCoaster {
        ipfs_link: String,
        money: u128,
    }

    impl MoesCoaster {
        // Instaniate with stupid values
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                ipfs_link: "ipfs://abc".into(),
                money: 0,
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

            if self.env().transfer(self.env().caller(), value).is_err() {
                panic!(
                    "requested transfer failed. this can be the case if the contract does not\
                     have sufficient free funds or if the transfer would have brought the\
                     contract's balance below minimum balance."
                )
            };
            true
        }

        // Journey function create ranomness
        #[ink(message)]
        pub fn generate_random_number(&self) -> u8 {
            1
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

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
