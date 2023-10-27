#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod moes_coaster {

    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct MoesCoaster {
        value: String,
    }

    impl MoesCoaster {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { value: "ipfs://abc".into() }
        }

        #[ink(message)]
        pub fn get(&self) -> String {
            self.value.clone()
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let MoesCoaster = MoesCoaster::new();
            assert_eq!(MoesCoaster.get(), "ipfs://abc");
        }

        // #[ink::test]
        // fn it_works() {
        //     let mut MoesCoaster = MoesCoaster::new(false);
        //     assert_eq!(MoesCoaster.get(), false);
        //     MoesCoaster.flip();
        //     assert_eq!(MoesCoaster.get(), true);
        // }
    }
}
