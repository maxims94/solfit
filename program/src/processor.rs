use solana_program::{
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar},
    program::{invoke_signed},
    borsh::try_from_slice_unchecked
};
use std::convert::TryInto;
use borsh::BorshSerialize;
use crate::error::SolFitError;
use crate::state::SolFitAccountState;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
  ) -> ProgramResult {

    let (&variant, rest) = instruction_data.split_first().ok_or(ProgramError::InvalidInstructionData)?;

    match variant {
         0 => start_membership(program_id, accounts),
         1 => claim_reward(program_id, accounts),
         2 => reset_user(program_id, accounts),
         _ => return Err(ProgramError::InvalidInstructionData)
    }
}

pub fn start_membership(
    program_id: &Pubkey,
    accounts: &[AccountInfo]
) -> ProgramResult {
    msg!("Start membership");

    let account_info_iter = &mut accounts.iter();

    let user = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !user.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (pda, bump_seed) = Pubkey::find_program_address(&[user.key.as_ref(), "account".as_bytes().as_ref(),], program_id);

    if pda != *pda_account.key {
        msg!("Invalid seeds for PDA");
        return Err(ProgramError::InvalidArgument)
    }

    if **pda_account.try_borrow_lamports()? == 0 {

        msg!("Create PDA: {}", pda);

        let total_len: usize = 1 + 1;

        let rent = Rent::get()?;
        let rent_lamports = rent.minimum_balance(total_len);

        invoke_signed(
            &system_instruction::create_account(
            user.key,
            pda_account.key,
            rent_lamports,
            total_len.try_into().unwrap(),
            program_id,
            ),
            &[user.clone(), pda_account.clone(), system_program.clone()],
            &[&[user.key.as_ref(), "account".as_bytes().as_ref(), &[bump_seed]]],
        )?;

        msg!("PDA created: {}", pda);

    }

    let mut account_data = try_from_slice_unchecked::<SolFitAccountState>(&pda_account.data.borrow()).unwrap();

    msg!("Membership month: {}", account_data.membership_month);
    msg!("Number available: {}", account_data.num_avail);

    if account_data.membership_month == 0 {
        // New member has registered
        // Initialize their account
        
        account_data.membership_month = 7; // July 2023
        account_data.num_avail = 4; // 4 reward of $10 available
    } else {
        // Existing member extending their membership
        account_data.membership_month += 1; // Advance by 1 month
        account_data.num_avail = 4; // Reset available rewards
    }

    msg!("New membership month: {}", account_data.membership_month);
    msg!("New number available: {}", account_data.num_avail);

    account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;

    Ok(())
}


pub fn claim_reward(
    program_id: &Pubkey,
    accounts: &[AccountInfo]
) -> ProgramResult {
    msg!("Claim reward");

    let account_info_iter = &mut accounts.iter();

    let user = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !user.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (pda, bump_seed) = Pubkey::find_program_address(&[user.key.as_ref(), "account".as_bytes().as_ref(),], program_id);

    if pda != *pda_account.key {
        msg!("Invalid seeds for PDA");
        return Err(ProgramError::InvalidArgument)
    }

    if **pda_account.try_borrow_lamports()? > 0 {
        msg!("Account is initialized");

        let mut account_data = try_from_slice_unchecked::<SolFitAccountState>(&pda_account.data.borrow()).unwrap();

        msg!("Membership month: {}", account_data.membership_month);
        msg!("Number available: {}", account_data.num_avail);

        if account_data.num_avail == 0 {
            msg!("No rewards available");

            return Err(SolFitError::NoRewardsAvailable.into());

        } else {
            msg!("Process reward");

            account_data.num_avail -= 1;
        }

        msg!("New membership month: {}", account_data.membership_month);
        msg!("New number available: {}", account_data.num_avail);

        account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;

    } else {
        msg!("Account not initialized");
        return Err(SolFitError::UninitializedAccount.into());
    }

    Ok(())
}


pub fn reset_user(
    program_id: &Pubkey,
    accounts: &[AccountInfo]
) -> ProgramResult {
    msg!("Reset user");

    let account_info_iter = &mut accounts.iter();

    let user = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !user.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (pda, bump_seed) = Pubkey::find_program_address(&[user.key.as_ref(), "account".as_bytes().as_ref(),], program_id);

    if pda != *pda_account.key {
        msg!("Invalid seeds for PDA");
        return Err(ProgramError::InvalidArgument)
    }

    let pda_account_lamports = **pda_account.try_borrow_lamports()?;

    if pda_account_lamports > 0 {
        msg!("Reset account");

        /*
        invoke_signed(
            &system_instruction::transfer(
            user.key,
            pda_account.key,
            pda_account_lamports
            ),
            &[user.clone(), pda_account.clone(), system_program.clone()],
            &[&[user.key.as_ref(), "account".as_bytes().as_ref(), &[bump_seed]]],
        )?;
        */

        let mut account_data = try_from_slice_unchecked::<SolFitAccountState>(&pda_account.data.borrow()).unwrap();

        msg!("Membership month: {}", account_data.membership_month);
        msg!("Number available: {}", account_data.num_avail);

        account_data.membership_month = 0;
        account_data.num_avail = 0;

        msg!("New membership month: {}", account_data.membership_month);
        msg!("New number available: {}", account_data.num_avail);

        account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;

    } else {
        msg!("No account to close");
    }

    Ok(())
}
