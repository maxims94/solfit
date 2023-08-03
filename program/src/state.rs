use borsh::{BorshSerialize, BorshDeserialize};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct SolFitAccountState {
    pub membership_month: u8,
    pub num_avail: u8
}
