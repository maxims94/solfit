import { NextApiRequest, NextApiResponse } from "next"

import { Connection, PublicKey } from '@solana/web3.js';

const PROGRAM_ID = '7RTk54MwQT7xE9SVnLy1mTA9bbw6TycMC5HdmZ599T4y'

type PostResponse = {
  member_month: number,
  num_avail: number
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {

  if (req.method === "POST") {

    if (!('publicKey' in req.body)) {
      res.status(400)
    }

    const { publicKey } = req.body

    console.log("get_user_data for ", publicKey)

    if (!process.env.NEXT_ALCHEMY_API_KEY) {
      throw new Error("Alchemy API Key not found")
    }

    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/' + process.env.NEXT_ALCHEMY_API_KEY

    const connection = new Connection(endpoint);

    const [pda] = await PublicKey.findProgramAddress(
        [(new PublicKey(publicKey)).toBuffer(), Buffer.from("account", "utf-8")],
        new PublicKey(PROGRAM_ID)
    )

    console.log("PDA is:", pda.toBase58())

    let result;

    try {
      result = await connection.getAccountInfo(pda)

    } catch (err: any) {
      
      console.log("No account found")

      res.status(200).json({
        member_month: 0,
        num_avail: 0
      })

      return
    }

    console.log(result)
    
    const arr = new Uint8Array(result!.data)

    res.status(200).json({
      member_month: arr[0],
      num_avail: arr[1]
    })
  } else {
    res.status(405)
  }
}
