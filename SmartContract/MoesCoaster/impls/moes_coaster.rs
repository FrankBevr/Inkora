#[ink::contract]
pub mod moes_coaster {
    /***********
     * Imports *
     ***********/
    use crate::azns_router::AznsContract;
    use crate::libs::errors::AznsRouterError;
    use crate::libs::errors::BeerTapErr;
    use ink::env::hash;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    /***********
     *   Data  *
     ***********/
    #[ink(storage)]
    pub struct MoesCoaster {
        ipfs_link: String,
        salt: u64,
        owner: AccountId,
    }

    /******************
     * Initialisation *
     ******************/
    impl MoesCoaster {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                ipfs_link: "Qme6WpYESqDqbwPSMfAyC6av7Mr6dJwTww9ramAN2zxCvk".into(),
                salt: 0,
                owner: Self::env().caller(),
            }
        }
    }

    /***********
     * Methods *
     ***********/
    impl crate::traits::moes_coaster::MoesCoaster for MoesCoaster {
        // Get Folder CID which cointains mushroom.obj and mushroom_texture.jpg
        #[ink(message)]
        fn get_ipfs_link(&self) -> String {
            self.ipfs_link.clone()
        }

        /*****************
         * Main Function *
         ****************/
        #[ink(message, payable)]
        fn participate_scratch_card(
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

        /***********************
         * Secondary Fucntions *
         **********************/

        // Changes the owner
        #[ink(message)]
        fn change_owner(&mut self, new_owner: AccountId) {
            if self.owner == self.env().caller() {
                self.owner = new_owner;
            }
        }

        /**********************
         * Azero ID Implention*
         *********************/

        /*
         * Only Implented.
         * It compiles, but not in use.
         */

        // It returns the address of a given domain.
        #[ink(message)]
        fn get_address(
            &self,
            router_addr: AccountId,
            domain: String,
        ) -> Result<AccountId, AznsRouterError> {
            let router: ink::contract_ref!(AznsContract) = router_addr.into();

            router.get_address(domain)
        }

        /********************
         * Journey Fucntions *
         *******************/

        /*
         * Journey Function are functions.
         * They chunk down the Main Function.
         * It decreases complexity.
         */

        // Transfer money to contract
        #[ink(message, payable)]
        fn feed_me(&self) {
            if self.owner == self.env().caller() {
                let _ = self.env().transferred_value();
            }
        }

        // Transfer money from contract to caller
        #[ink(message)]
        fn puke_it(&self, value: Balance) -> bool {
            assert!(value <= self.env().balance(), "insufficient funds!");
            let _ = self.env().transfer(self.env().caller(), value);
            true
        }

        // Create randomness
        #[ink(message)]
        fn generate_random_number(&mut self, max_value: u8) -> u8 {
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

        // Calcuclation of percentage without using devision
        #[ink(message)]
        fn divide_by_100(&self, value: u128) -> Result<u128, self::BeerTapErr> {
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

        // Combines feeding, puking, randomness and percentage
        #[ink(message)]
        fn feed_me_randomly(&mut self) -> Result<u128, self::BeerTapErr> {
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
    }

    #[cfg(test)]
    mod tests {
        /**********
         * Imorts *
         *********/
        use super::Balance;
        use crate::impls::moes_coaster::moes_coaster::AccountId;
        use crate::impls::moes_coaster::moes_coaster::MoesCoaster;

        /**************
         * Unit Tests *
         *************/
        #[ink::test]
        fn get_ipfs_link() {
            let moes_coaster = MoesCoaster::new();
            assert_eq!(
                crate::traits::moes_coaster::MoesCoaster::get_ipfs_link(&moes_coaster),
                "Qme6WpYESqDqbwPSMfAyC6av7Mr6dJwTww9ramAN2zxCvk"
            );
        }

        #[ink::test]
        fn puke_it() {
            // Set up
            let contract_balance = 100;
            let accounts = default_accounts();
            let moes_coaster = create_contract(contract_balance);

            // When
            set_sender(accounts.eve);
            set_balance(accounts.eve, 0);
            crate::traits::moes_coaster::MoesCoaster::puke_it(&moes_coaster, 80);

            // Then
            assert_eq!(get_balance(accounts.eve), 80);
        }

        #[test]
        fn generate_random_number() {
            // let contract_balance = 100;
            // let accounts = default_accounts();
            // let mut moes_coaster = create_contract(contract_balance);

            // 🤔🤔🤔🤔🤔⚠️❓
            // let result = crate::traits::moes_coaster::MoesCoaster::generate_random_number(
            //     &mut contract,
            //     10,
            // );
            assert!(true == true);
        }

        /*************************
         * Utilities for Testing *
         ************************/
        pub fn create_contract(initial_balance: Balance) -> MoesCoaster {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            set_balance(contract_id(), initial_balance);
            MoesCoaster::new()
        }

        pub fn contract_id() -> AccountId {
            ink::env::test::callee::<ink::env::DefaultEnvironment>()
        }

        pub fn set_sender(sender: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }

        pub fn default_accounts() -> ink::env::test::DefaultAccounts<ink::env::DefaultEnvironment> {
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>()
        }
        pub fn set_balance(account_id: AccountId, balance: Balance) {
            ink::env::test::set_account_balance::<ink::env::DefaultEnvironment>(account_id, balance)
        }

        pub fn get_balance(account_id: AccountId) -> u128 {
            ink::env::test::get_account_balance::<ink::env::DefaultEnvironment>(account_id)
                .expect("Cannot get account balance")
        }
    }
}
