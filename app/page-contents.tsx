"use client"

import { useEffect, useState, useRef, useCallback } from 'react'

import EnterPage from '@/app/enter-page'
import ConnectWalletPage from '@/app/connect-wallet-page'
import BecomeMemberPage from '@/app/become-member-page'

import ProfilePage from '@/app/profile-page'
import CheckinPage from '@/app/checkin-page'

import { PublicKey } from '@solana/web3.js'

import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react';

import createTx from '@/lib/create_tx'

export default function PageContents() {

  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();
  
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const [currentTab, setCurrentTab] = useState<"profile" | "checkin">("profile");

  const [userAccount, setUserAccount] = useState<{ member_month: number, num_avail: number } | null>(null);

  const isExecTx = useRef<boolean>(false)

  const execTx = async (ix_index: number) => {

      if(isExecTx.current) {
        return
      }

      isExecTx.current = true

      if (ix_index == 0) {
        console.log("Start subscription for ", publicKey!.toString())
      }

      const tx = await createTx(publicKey, ix_index)

      try {
        const sig = await sendTransaction(tx, connection)
      } catch(err: any) {
        isExecTx.current = false
        console.error(err)
      }

      while(true) {
        console.log("fetch user data")

        const responseRaw = await fetch(
          "/api/get_user_data",
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ publicKey: publicKey!.toString() })
          }
        )
        
        const response = await responseRaw.json();
        console.log(response)

        if(response.member_month !== 0) {
          setUserAccount(response)

          isExecTx.current = false
          break
        }

      }

  }

  const onConnect = useCallback(async (publicKey: PublicKey) => {
    console.log("Connected:", publicKey.toString())

    try {

      console.log("fetch user data")

      const responseRaw = await fetch(
        "/api/get_user_data",
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ publicKey: publicKey.toString() })
        }
      )
      
      const response = await responseRaw.json();
      console.log(response)
      
      setUserAccount(response)


    } catch (error: any) {
    }
  }, [connection])

  const onDisconnect = useCallback(() => {
    console.log("Wallet disconnected")
    setUserAccount(null)
    setCurrentTab("profile")
  }, [])

  useEffect(() => {

    if (wallet !== null) {
      wallet.adapter.on('connect', onConnect)
      wallet.adapter.on('disconnect', onDisconnect)

      return () => {
        wallet.adapter.off('connect', onConnect)
        wallet.adapter.off('disconnect', onDisconnect)
      }
    }

  }, [onConnect, onDisconnect, wallet])

  if (!hasEntered) {
    return <EnterPage setHasEntered={setHasEntered} />
  }

  if (publicKey === null || wallet === null) {
    return <ConnectWalletPage />
  }
  
  if (userAccount?.member_month === 0) {
    return <BecomeMemberPage execTx={execTx}/>
  }

  if (userAccount !== null) {
    if (currentTab === "profile") {

      console.log(userAccount)
      return <ProfilePage userAccount={userAccount} setCurrentTab={setCurrentTab}/>
    } else {
      return <CheckinPage execTx={execTx} setCurrentTab={setCurrentTab}/>
    }
  }
}
