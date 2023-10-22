#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod moes_coaster {
    #[ink(storage)]
    pub struct MoesCoaster {
        value: bool,
    }

    impl MoesCoaster {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let MoesCoaster = MoesCoaster::default();
            assert_eq!(MoesCoaster.get(), false);
        }

        #[ink::test]
        fn it_works() {
            let mut MoesCoaster = MoesCoaster::new(false);
            assert_eq!(MoesCoaster.get(), false);
            MoesCoaster.flip();
            assert_eq!(MoesCoaster.get(), true);
        }
    }
}
