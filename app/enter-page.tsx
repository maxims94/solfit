"use client"

import Image from 'next/image'

import { useEffect, useState, useRef } from 'react'

import logoMan from '../public/logo_man.png'

export default function EnterPage({setHasEntered}: {setHasEntered: (hasEntered: boolean) => void}) {
  return (
    <div className="flex flex-col mt-[120px] items-center h-full">
      <div className="flex flex-col items-center mt-10">
        <Image src={logoMan} alt="SolFit Man"/>
        <a href="#" onClick={() => setHasEntered(true)} className="mt-5 purple-button">Enter</a>
      </div>
    </div>
  )
}
