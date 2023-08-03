"use client"

import { useEffect, useState, useRef, useCallback } from 'react'

import Image from 'next/image'

import solfitLogo from '../public/solfit.svg'

import profileIcon from '@/public/profile.svg'
import checkInIcon from '@/public/check-in.svg'

import ConnectWalletPage from '@/app/ConnectWalletPage'
import LoadingPage from '@/app/LoadingPage'

import BecomeMemberPage from '@/app/BecomeMemberPage'

import UserProfile from '@/app/UserProfile'
import CheckIn from '@/app/CheckIn'

import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react';

import createSolFitTx from '@/lib/createSolFitTx'

import { Connection, PublicKey } from '@solana/web3.js'

export default function PageContents() {

  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();

  const [currentTab, setCurrentTab] = useState<"profile" | "checkin">("profile");

  const [loadingState, setLoadingState] = useState<string | null>(null);

  const [notifier, setNotifier] = useState<any | null>(null);

  const [userData, setUserData] = useState<null | {member_month: number, num_avail:number}>(null)

  const onConnect = useCallback(async (publicKey: PublicKey) => {
    console.log("Connected:", publicKey.toString())

    try {

      console.log("Fetch user data")

      setLoadingState("Loading user data...")

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
      setLoadingState(null)

    } catch (error: any) {
      console.log(error)
    }
  }, [])

  const onDisconnect = useCallback(() => {
    console.log("Wallet disconnected")

    setUserData(null)
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

  const onBecomeMember = () => {
    console.log("Become a member")

    setLoadingState("Subscribing...")

    setUserData(null);

    (async () => {

      const tx = await createSolFitTx(publicKey!, 0, connection);

      try {
        const sig = await sendTransaction(tx, connection)
        console.log(sig)
        console.log("Success")
        setUserData({member_month: 7, num_avail:4})

        setNotifier(<p>You paid <b>$1.2</b> ($120). You are now a member! \uD83C\uDF89</p>)
      } catch (err: any) {
        console.log("Failure")
        console.log(err)
      } finally{
        setLoadingState(null)
      }

    })();

  }

  const onCheckinSubmit = () => {
    console.log("Perform Check in");

    setLoadingState("Checking in...");

    (async () => {

      const tx = await createSolFitTx(publicKey!, 1, connection);

      try {
        const sig = await sendTransaction(tx, connection)
        console.log(sig)
        console.log("Success")

        if (userData!.num_avail > 0) {
          setUserData({member_month: userData!.member_month, num_avail: userData!.num_avail-1})
          setNotifier(<p>Your reward: <b>$0.10</b> ($10)!</p>)

        } else {
          setUserData({member_month: userData!.member_month, num_avail: userData!.num_avail})
          setNotifier(<p>Checked in! (no reward)</p>)
        }
        setCurrentTab("profile")
      } catch (err: any) {
        console.log("Failure")
        console.log(err)
      } finally{
        setLoadingState(null)
      }

    })();
  }

  const onNextMonth = () => {

    setLoadingState("Subscribe for next month...");


    setUserData(null);

    (async () => {

      const tx = await createSolFitTx(publicKey!, 0, connection);
      try {
        const sig = await sendTransaction(tx, connection)
        console.log(sig)
        console.log("Success")
        setUserData({member_month:8, num_avail:4})

        setNotifier(<p>You paid <b>$1.2</b> ($120) for another month! \uD83C\uDF89</p>)
      } catch (err: any) {
        console.log("Failure")
        console.log(err)
      } finally{
        setLoadingState(null)
      }

    })();
  }

  const tabsActive = userData !== null && userData.member_month !== 0;

  return (
    <div className="flex flex-col justify-between h-full relative">
      <div className="flex flex-col items-center">

        <Image src={solfitLogo} alt="SolFit Logo" className="mt-[40px] mb-[25px]"/>
        <div className="divider"></div>
        {
          (publicKey === null || wallet === null) ?
          <ConnectWalletPage />
          :
          (
            loadingState !== null ?
            <LoadingPage msg={loadingState} />
            : 
            (
              userData === null ?
              <p>No user data</p>
              :
              (
                userData.member_month === 0 ?
                <BecomeMemberPage onBecomeMember={onBecomeMember} />
                :
                (
                  currentTab === "profile" ? <UserProfile userData={userData} onNextMonth={onNextMonth}/> : <CheckIn onSubmit={onCheckinSubmit} />
                )
              )
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
              <div className="rounded-xl border border-slate-500 p-5 bg-white text-slate-800 cursor-pointer mx-[20px]" onClick={() => setNotifier(null)}>
                <p>{notifier}</p>
              </div>
            </div>
          :
          null
      }
    </div>
  )
}
