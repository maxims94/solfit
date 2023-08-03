"use client"

import Image from 'next/image'

import { useEffect, useState, useRef, useCallback } from 'react'

import solfitLogo from '../public/solfit.svg'
import logoMan from '../public/man.png'

import create_tx from '@/lib/create_tx'

export default function BecomeMemberPage({execTx} : {execTx: (ix_index: number) => void}) {
  return (

    <div className="flex flex-col items-center h-full">
      <Image src={solfitLogo} alt="SolFit Logo" className="mt-[60px] mb-[25px]"/>
      <div className="divider"></div>
      <Image src={logoMan} alt="SolFit Man" className="mt-[60px]"/>
      <div className="mt-5">Become a member for $120!</div>
      <a onClick={() => execTx(0)} href="#" className="mt-5 purple-button">Pay with Solana</a>
    </div>
  )
}
