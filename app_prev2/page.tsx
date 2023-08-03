"use client"

import Image from 'next/image'

import WalletContextProvider from '@/components/WalletContextProvider'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import phoneBg from '../public/phone_bg.svg'
import PageContents from '@/app/page-contents'

export default function Page() {

  return (
    <WalletContextProvider>
    <main className="flex flex-col justify-center">
      <div className="flex flex-col mt-[100px] items-center">
          <div className="flex flex-col w-[315px]">
            <div className="mb-5 self-end"><WalletMultiButton /></div>
            <div className="relative">
              <div className="absolute w-[315px] h-[634px] pl-[18px] pr-[18px] pt-[30px] pb-[30px]">
                <PageContents />
              </div>
              <Image src={phoneBg} alt="phone"/>
            </div>
          </div>
          <div className="gradient2 mt-3"></div>
      </div>
    </main>
    </WalletContextProvider>
  )
}
