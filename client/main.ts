#!ts-node

import base58 from 'bs58'

const { Keypair, Transaction, Connection, PublicKey, TransactionInstruction, sendAndConfirmTransaction, SystemProgram } = require('@solana/web3.js');

// 
// LOCALHOST
//

//const RPC_URL = 'http://127.0.0.1:8899'

// const PROGRAM_ID = '7RTk54MwQT7xE9SVnLy1mTA9bbw6TycMC5HdmZ599T4y'

// For localhost
// ~/.config/solana/2023-07-30_solfit-local-dev.jsonj
// Public key: CSSYN2X6BR31PH74eejWerpT8xdQzNY2U1qaxvWANGVk
//const PAYER_SECRET_KEY = '---'

//
// MAINNET
//

const RPC_URL = "https://api.mainnet-beta.solana.com"

const PROGRAM_ID = '7RTk54MwQT7xE9SVnLy1mTA9bbw6TycMC5HdmZ599T4y'

// For mainnet
// 2023-07-30_solfit-main
// Public key: 7ZYNWp8HrFCkKnhmE5mchZVuE3B4qe4M4AjtFv1CAi5H
//const PAYER_SECRET_KEY = '---'

const PAYER_SECRET_KEY = '---'

//
// Start membership
//

async function start_membership() {

    console.log("SolFit: start membership");

    const connection = new Connection(RPC_URL);

    const payerKeypair = Keypair.fromSecretKey(base58.decode(PAYER_SECRET_KEY))

    const tx = new Transaction();

    const [pda] = await PublicKey.findProgramAddress(
        [payerKeypair.publicKey.toBuffer(), Buffer.from("account", "utf-8")],
        new PublicKey(PROGRAM_ID)
    )

    console.log("PDA is:", pda.toBase58())

    tx.add(
      {
        programId: PROGRAM_ID,

        keys: [
            {
              pubkey: payerKeypair.publicKey,
              isWritable: true,
              isSigner: true
            },
            {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],
        data: Buffer.from([0])
      }
    );
    
    tx.feePayer = payerKeypair.publicKey

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    tx.sign(payerKeypair)

    const sig = await sendAndConfirmTransaction(connection, tx, [payerKeypair])

    console.log(sig)
}

//
// Claim reward
//

async function claim_reward() {

    console.log("SolFit: claim reward");

    const connection = new Connection(RPC_URL);

    const payerKeypair = Keypair.fromSecretKey(base58.decode(PAYER_SECRET_KEY))

    const tx = new Transaction();

    const [pda] = await PublicKey.findProgramAddress(
        [payerKeypair.publicKey.toBuffer(), Buffer.from("account", "utf-8")],
        new PublicKey(PROGRAM_ID)
    )

    console.log("PDA is:", pda.toBase58())

    tx.add(
      {
        programId: PROGRAM_ID,
        keys: [
            {
              pubkey: payerKeypair.publicKey,
              isWritable: true,
              isSigner: true
            },
            {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],
        data: Buffer.from([1])
      }
    );

    tx.feePayer = payerKeypair.publicKey

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    tx.sign(payerKeypair)

    const sig = await sendAndConfirmTransaction(connection, tx, [payerKeypair])

    console.log(sig)
}

//
// Reset user
//

async function reset_user() {

    console.log("SolFit: reset user");

    const connection = new Connection(RPC_URL);

    const payerKeypair = Keypair.fromSecretKey(base58.decode(PAYER_SECRET_KEY))

    const tx = new Transaction();

    const [pda] = await PublicKey.findProgramAddress(
        [payerKeypair.publicKey.toBuffer(), Buffer.from("account", "utf-8")],
        new PublicKey(PROGRAM_ID)
    )

    console.log("PDA is:", pda.toBase58())

    tx.add(
      {
        programId: PROGRAM_ID,
        keys: [
            {
              pubkey: payerKeypair.publicKey,
              isWritable: true,
              isSigner: true
            },
            {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],
        data: Buffer.from([2])
      }
    );

    tx.feePayer = payerKeypair.publicKey

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    tx.sign(payerKeypair)

    const sig = await sendAndConfirmTransaction(connection, tx, [payerKeypair])

    console.log(sig)
}


const command = process.argv[2]

if (command == "start_membership") {
  start_membership().then(null, console.error)
} else if (command == "claim_reward") {
  claim_reward().then(null, console.error)
} else if (command == "reset_user") {
  reset_user().then(null, console.error)
} else {
  if(command !== undefined) {
    console.error(`Invalid command ${command}`)
  } else {
    console.error("No command passed")
  }
  console.log("Possible commands: start_membership, claim_reward, reset_user")
}
