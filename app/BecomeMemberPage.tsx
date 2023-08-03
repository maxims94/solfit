"use client"

import Image from 'next/image'

import logoMan from '../public/man.png'

export default function BecomeMemberPage({onBecomeMember}:any) {
  return (

    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center mt-5">
        <Image src={logoMan} alt="SolFit Man" className="mt-[60px]" width={80}/>
        <div className="mt-5 font-bold">Subscribe for <span className="text-[#BD00FF]">$120</span>!</div>
        <a onClick={onBecomeMember} href="#" className="block mt-5 purple-button">Pay with Solana</a>
      </div>
    </div>
  )
}
