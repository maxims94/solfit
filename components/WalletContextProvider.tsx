import { FC, ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import { PhantomWalletAdapter, SolflareWalletAdapter, GlowWalletAdapter } from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css')

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const wallets = [
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new PhantomWalletAdapter(),
    ]

    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
      throw new Error("Alchemy API Key not found")
    }

    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/' + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

    return (

        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                  { children }
              </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider
