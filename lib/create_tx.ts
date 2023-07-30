import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'

const PROGRAM_ID = '7RTk54MwQT7xE9SVnLy1mTA9bbw6TycMC5HdmZ599T4y'

export default async function create_tx(publicKey: PublicKey, ix_index: number) {

    console.log("create_tx for ", publicKey, " -- type: ", ix_index)

    const [pda] = await PublicKey.findProgramAddress(
        [publicKey.toBuffer(), Buffer.from("account", "utf-8")],
        new PublicKey(PROGRAM_ID)
    )

    console.log("PDA is:", pda.toBase58())

    const tx = new Transaction();

    tx.add(
      {
        programId: new PublicKey(PROGRAM_ID),

        keys: [
            {
              pubkey: publicKey,
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
    
    tx.feePayer = publicKey

    return tx

}
