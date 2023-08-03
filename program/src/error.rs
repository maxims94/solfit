use solana_program::{program_error::ProgramError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum SolFitError{
    #[error("Account not initialized")]
    UninitializedAccount,
    
    #[error("No rewards available")]
    NoRewardsAvailable
}

impl From<SolFitError> for ProgramError {
    fn from(e: SolFitError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
