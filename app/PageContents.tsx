"use client"

import { useEffect, useState, useRef, useCallback } from 'react'

import Image from 'next/image'

import solfitLogo from '../public/solfit.svg'

import profileIcon from '@/public/profile.svg'
import checkInIcon from '@/public/check-in.svg'

import ConnectWalletPage from '@/app/ConnectWalletPage'
import LoadingPage from '@/app/LoadingPage'

import BecomeMemberPage from '@/app/BecomeMemberPage'

import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react';

export default function PageContents() {

  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();

  const [currentTab, setCurrentTab] = useState<"profile" | "checkin">("profile");

  const [notifier, setNotifier] = useState<string | null>(null);

  const [userData, setUserData] = useState<null | {member_month: int, num_avail:int}>(null)

  const onConnect = useCallback(async (publicKey: PublicKey) => {
    console.log("Connected:", publicKey.toString())

    try {

      console.log("Fetch user data")

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
      
      setUserData(response)

    } catch (error: any) {
      console.log(error)
    }
  }, [connection])

  const onDisconnect = useCallback(() => {
    console.log("Wallet disconnected")

    /*
    setUserAccount(null)
    setCurrentTab("profile")
    */
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

  const tabsActive = true;

  return (
    <div className="flex flex-col justify-between h-full relative">
      <div className="flex flex-col items-center">

        <Image src={solfitLogo} alt="SolFit Logo" className="mt-[40px] mb-[25px]"/>
        <div className="divider"></div>
        {
          publicKey === null || wallet === null ?
          <ConnectWalletPage />
          :
          (
            userData === null ?
            <LoadingPage msg="Loading user data..." /> :
            (
              userData.member_month === 0 ?
              <BecomeMemberPage />
              :
              <p>is member</p>
            )
          )
        }
      </div>
      <div className="flex flex-row justify-center py-4 border-t border-slate-300">
        {
          tabsActive ?
          <>
          <Image src={profileIcon} alt="profile" className="mr-[100px] cursor-pointer" onClick={() => setCurrentTab("profile")} />
          <Image src={checkInIcon} alt="check-in" className="cursor-pointer" onClick={() => setCurrentTab("checkin")} />
          </>
          :
          <>
          <Image src={profileIcon} alt="profile" className="mr-[100px]" />
          <Image src={checkInIcon} alt="check-in" />
          </>
        }
      </div>

      {
        notifier !== null ?
            <div className="absolute flex w-full h-full justify-center items-center">
              <div className="rounded-xl border border-slate-500 p-5 bg-white text-slate-800 cursor-pointer" onClick={() => setNotifier(null)}>
                <p>{notifier}</p>
              </div>
            </div>
          :
          null
      }
    </div>
  )
}
