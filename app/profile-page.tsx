"use client"

import Image from 'next/image'

import { useEffect, useState, useRef, useCallback } from 'react'

import solfitLogo from '../public/solfit.svg'
import logoMan from '../public/logo_man.png'

import progress0 from '@/public/progress_0.svg'
import progress5 from '@/public/progress_5.svg'
import progress10 from '@/public/progress_10.svg'
import progress15 from '@/public/progress_15.svg'
import progress20 from '@/public/progress_20.svg'

import profileIcon from '@/public/profile.svg'
import checkInIcon from '@/public/check-in.svg'

const PROGRESS_MESSAGE: any = {
  0: "Check in to get a reward!",
  5: "Getting started is hardest.",
  10: "Keep going!",
  15: "You're almost there!",
  20: "You did it! \uD83C\uDF89"
}

const PROGRESS_IMAGE: any = {
  0: progress0,
  5: progress5,
  10: progress10,
  15: progress15,
  20: progress20
}

const MONTH_MAP: string[] = ["January", "February", "March", "May", "April", "June", "July", "August", "September", "October", "November", "December"]

export default function ProfilePage({userAccount, setCurrentTab}) {

  console.log(userAccount)

  const progressAmount = 10 * (4- userAccount.num_avail)
  console.log(progressAmount)

  return (
  <>

    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center">
        <Image src={solfitLogo} alt="SolFit Logo" className="mt-[60px] mb-[25px] self-center"/>
        <div className="divider"></div>

        <div className="flex flex-row justify-between px-3 mt-5 mb-2 self-stretch text-lg">
          <span className="font-semibold">Month:</span>
          <span>{MONTH_MAP[userAccount.member_month-1]} 2023</span>
        </div>

        <div className="flex flex-row justify-between px-3 mb-5 self-stretch text-lg">
          <span className="font-semibold">Total:</span>
          <span><span className="font-semibold">${120 - progressAmount}</span> ($120 - <span className="text-[#13EC00]">${progressAmount}</span>)</span>
        </div>

        <div className="divider"></div>

          <div className="flex flex-col">
            <p className="text-lg mb-4 mt-8 self-center ">{PROGRESS_MESSAGE[progressAmount]}</p>
            <div className="flex flex-row justify-between items-center">
              <Image src={PROGRESS_IMAGE[progressAmount]} width={270} alt="progress bar"/>
            </div>
            <p className="self-center mt-4">${progressAmount} / $40</p>
          </div>
      
      </div>
      <div className="flex flex-row justify-center py-4 border-t border-slate-300">
          <Image src={profileIcon} alt="profile" className="mr-[100px] cursor-pointer" onClick={() => setCurrentTab("profile")} />
          <Image src={checkInIcon} alt="check-in" className="cursor-pointer" onClick={() => setCurrentTab("checkin")} />
      </div>
    </div>
    </>
  )
}
