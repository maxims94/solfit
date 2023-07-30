import { useState } from 'react'

import Image from 'next/image'

import progress0 from '@/public/progress_0.svg'
import progress5 from '@/public/progress_5.svg'
import progress10 from '@/public/progress_10.svg'
import progress15 from '@/public/progress_15.svg'
import progress20 from '@/public/progress_20.svg'


const PROGRESS_MESSAGE: any = {
  0: "Getting started is hardest.",
  5: "You're doing great!",
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

export default function Profile({ checkInData, onRewardClaimed, subscriptionData, setSubscriptionData, setCheckInData, progressAmount, setProgressAmount }: any) {

  // Testing
  //const [modalState, setModalState] = useState<any>({ active: true, processing: true, message: "Success!" });

  const [modalState, setModalState] = useState<any>({ active: false, processing: false, message: undefined, onDone: undefined });

  const onDoneSubscription = () => {
    setSubscriptionData({ active: true, month: "July 2023" })
  }

  const onSubscribeClick = () => {
    setModalState({ active: true, processing: true, message: <p>You paid <b>$60</b>. Your subscription is now active! \uD83C\uDF89</p>, onDone: onDoneSubscription })
  }

  const onDoneClaim = () => {
    setProgressAmount(progressAmount + 5)
    onRewardClaimed()
  }

  const onClaimClick = () => {
    setModalState({ active: true, processing: true, message: <p>SolFit just paid you <b>$5</b>! Keep going! \uD83C\uDF89</p>, onDone: onDoneClaim })
  }

  const onModalClick = () => {
    if (modalState.processing) {
      setModalState({ ...modalState, processing: false })
    } else {
      setModalState({ ...modalState, active: false })
      if (modalState.onDone) {
        modalState.onDone()
      }
    }
  }


  const onNextMonth = () => {
    setSubscriptionData({active: true, month: "August 2023"})
    setProgressAmount(0)
    setCheckInData([])
  }

  const checkInContents: any[] = []

  if (checkInData.length > 0) {
    let numClaimable = 0
    
    console.log(checkInData)
    
    for (const [i,checkIn] of checkInData.entries()) {

      console.log(i, checkIn)
      let state;
      if (!checkIn.claimed) {
        if (numClaimable < 4) {
          state = "claimable"
          numClaimable += 1
        } else {
          state = "unclaimable"
        }
      } else {
        state = "claimed"
        numClaimable += 1
      }

      console.log(checkIn.date + String(i))
      checkInContents.push(
        <div key={checkIn.date + String(i)} className="flex flex-row justify-between mb-2 items-center">
          <p>{checkIn.date}</p>
          <p>{
            state == "claimed" ?
              <div className="inline-block rounded-full text-white font-bold bg-[#13EC00] px-4 py-2">+$5</div>
              //<div className="inline-block rounded-full text-[#05DE00] font-semibold bg-slate-100 px-4 py-2">+$5</div>
              : state == "claimable" ?
                <div className="inline-block rounded-full text-white font-bold bg-blue-500 px-4 py-2 cursor hover:bg-red-500 cursor-pointer" onClick={onClaimClick}>
                  Claim
                </div>
                
                : <p className="font-semibold text-center w-[63px]">—</p>
          }
          </p>
        </div>
      )
    }
    
    if(checkInData.length > 4) {
      checkInContents.push(<p key="next-month" className="underline w-full text-sm cursor-pointer mt-8" onClick={onNextMonth}>Next month</p>)
    }
    
  } else {
    checkInContents.push(<p key="no-checkin">No check-ins yet!</p>)
  }

  return (
    <>
      {
        modalState.active ?
          <div className="fixed top-0 left-0 w-screen h-screen">
            <div className="absolute w-screen h-screen bg-slate-300 opacity-[0.3]">
            </div>

            <div className="absolute flex w-screen h-screen justify-center items-center">
              <div className="rounded-xl border border-slate-300 p-5 bg-white text-slate-800" onClick={onModalClick}>
                {
                  modalState.processing ? <div><p>Processing...</p><p className="text-xs">(Click to continue)</p></div> : modalState.message
                }
              </div>
            </div>
          </div>
          :
          null
      }

      {
        !subscriptionData.active ?

          <div className="py-8 px-4">
            <h1 className="text-2xl mb-2"><span className="font-semibold">Subscribe!</span></h1>
            <p className="text-xl mb-4">Become a member for $60 / month!</p>
            <div className="inline-block rounded-full text-white font-semibold bg-blue-500 px-4 py-2 cursor hover:bg-red-500 cursor-pointer" onClick={onSubscribeClick}>Subscribe</div>
          </div>

          :
          <>
            <div className="border-b py-8 px-4">
              <h1 className="text-2xl mb-2">Your <span className="font-semibold">Subscription</span></h1>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between my-2">
                  <span className="font-semibold">Month:</span>
                  <span>{subscriptionData.month}</span>
                </div>

                <div className="flex flex-row justify-between">
                  <span className="font-semibold">Total:</span>
                  <span><span className="font-semibold">${60 - progressAmount}</span> ($60 - <span className="text-[#13EC00]">${progressAmount}</span>)</span>
                </div>
              </div>
            </div>

            <div className="border-b py-8 px-4">
              <h1 className="text-2xl mb-4">Your <span className="font-semibold">Progress</span></h1>
              <div className="flex flex-col">
                <p className="text-lg mb-4">{PROGRESS_MESSAGE[progressAmount]}</p>
                <div className="flex flex-row justify-between items-center">
                  <Image src={PROGRESS_IMAGE[progressAmount]} width={350} alt="progress bar"/>
                  <p>${progressAmount} / $20</p>
                </div>
              </div>
            </div>

            <div className="py-8 px-4">
              <h1 className="text-2xl mb-2">Your <span className="font-semibold">Check-Ins</span></h1>
              <div className="flex flex-col">
                {
                  checkInContents
                }
              </div>
            </div>
          </>

      }
    </>
  )
}