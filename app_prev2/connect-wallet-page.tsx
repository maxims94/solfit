"use client"

import Image from 'next/image'

import { useEffect, useState, useRef } from 'react'

import solfitLogo from '../public/solfit.svg'
import logoMan from '../public/man.png'

export default function ConnectWalletPage() {
  return (

    <div className="flex flex-col items-center h-full">
      <Image src={solfitLogo} alt="SolFit Logo" className="mt-[40px] mb-[25px]"/>
      <div className="divider"></div>
      <Image src={logoMan} alt="SolFit Man" width={60} className="mt-[135px]"/>
      <div className="mt-4 font-bold">Connect your wallet</div>
    </div>
  )
}
