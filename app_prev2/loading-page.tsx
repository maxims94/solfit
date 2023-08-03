"use client"

import Image from 'next/image'

import { useEffect, useState, useRef, useCallback } from 'react'

import solfitLogo from '../public/solfit.svg'

export default function LoadingPage() {
  return (

    <div className="flex flex-col items-center h-full">
      <Image src={solfitLogo} alt="SolFit Logo" className="mt-[60px] mb-[25px]"/>
      <div className="divider"></div>
      <div className="loader"></div>
    </div>
  )
}
