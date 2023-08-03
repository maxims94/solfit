"use client"

import Image from 'next/image'

import connect from '../public/connect.svg'

export default function ConnectWalletPage() {
  return (
    <>
    <Image src={connect} alt="Connect" width={50} className="mt-[135px]"/>
    <div className="mt-4 font-bold">Connect your wallet</div>
    </>
  )
}
