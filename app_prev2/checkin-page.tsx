"use client"

import Image from 'next/image'

import { useEffect, useState, useRef, useCallback } from 'react'

import solfitLogo from '../public/solfit.svg'
import logoMan from '../public/logo_man.png'

import create_tx from '@/lib/create_tx'

import profileIcon from '@/public/profile.svg'
import checkInIcon from '@/public/check-in.svg'

export default function CheckinPage({execTx, setCurrentTab} : {execTx: (ix_index: number) => void, setCurrentTab: any}) {

  return (
  <>

    <div className="flex flex-col justify-between h-full">

      <div className="flex flex-col items-center">
        <Image src={solfitLogo} alt="SolFit Logo" className="mt-[60px] mb-[25px] self-center"/>
        <div className="divider"></div>

            <h1 className="text-xl mb-2 mt-4 font-bold">Check-In</h1>

            <form onSubmit={() => execTx(1)}>
                <label className="flex flex-row items-center">
                    <span className="mr-4 text-lg">Date:</span>
                    <input id="date" type="text" size={10} defaultValue="02.07.2023" className="border p-2"/>
                </label>
                <input type="submit" value="Submit" className="purple-button mt-4 cursor-pointer"/>
            </form>
      
      </div>

      <div className="flex flex-row justify-center py-4 border-t border-slate-300">
          <Image src={profileIcon} alt="profile" className="mr-[100px] cursor-pointer" onClick={() => setCurrentTab("profile")} />
          <Image src={checkInIcon} alt="check-in" className="cursor-pointer" onClick={() => setCurrentTab("checkin")} />
      </div>
    </div>
    </>
  )
}
