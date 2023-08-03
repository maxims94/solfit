"use client"

import Image from 'next/image'

import progress0 from '@/public/progress_0.svg'
import progress5 from '@/public/progress_5.svg'
import progress10 from '@/public/progress_10.svg'
import progress15 from '@/public/progress_15.svg'
import progress20 from '@/public/progress_20.svg'

const PROGRESS_MESSAGE: any = {
  0: "Check in to get a reward!",
  10: "Getting started is hardest.",
  20: "Keep going!",
  30: "You're almost there!",
  40: "You did it! \uD83C\uDF89"
}

const PROGRESS_IMAGE: any = {
  0: progress0,
  10: progress5,
  20: progress10,
  30: progress15,
  40: progress20
}

const MONTH_MAP: string[] = ["January", "February", "March", "May", "April", "June", "July", "August", "September", "October", "November", "December"]

export default function UserProfile({userData, onNextMonth}:any) {


  console.log(userData)

  const progressAmount = 10 * (4- userData.num_avail)
  console.log(progressAmount)

  return (

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-row justify-between px-3 mt-5 mb-2 self-stretch text-lg">
            <span className="font-semibold">Month:</span>
            <span>{MONTH_MAP[userData.member_month-1]} 2023</span>
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
        <div className="flex flex-col items-end mb-4 mt-[125px]">
          <a href="#" className="underline text-sm mr-[10px]" onClick={onNextMonth}>Next month</a> 
        </div>
      </div>
  )
}
