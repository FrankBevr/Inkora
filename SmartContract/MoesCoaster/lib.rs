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
        #[ink(message)]
        pub fn feed_me(&self) -> bool {
            true
        }

        // Journey function to transfer money from contract to caller
        #[ink(message)]
        pub fn puke_it(&self) -> bool {
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
        fn default_works() {
            let moes_coaster = MoesCoaster::new();
            assert_eq!(moes_coaster.get_ipfs_link(), "ipfs://abc");
        }
    }
}
