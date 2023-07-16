"use client"

import { useEffect, useState, useRef } from 'react'

import Profile from '@/app/profile'
import CheckIn from '@/app/checkin'

export default function Home() {

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [checkInData, setCheckInData] = useState<any[]>([]);

  // Testing
  //const [subscriptionData, setSubscriptionData] = useState<any>({active: true, month: 'July 2023'}); 

  const [subscriptionData, setSubscriptionData] = useState<any>({active: false, month: undefined}); 

  const [progressAmount, setProgressAmount] = useState<number>(0);

  const performCheckIn = (date: string) => {
    console.log(date);
    setCheckInData([...checkInData, {date: date, claimed: false}]);
    setTabIndex(0);
  }
  
  const onRewardClaimed = () => {
    const checkInDataCopy = [...checkInData]

    for(let i = 0; i < checkInDataCopy.length; i++) {
      if(!checkInDataCopy[i].claimed) {
        checkInDataCopy[i].claimed = true
        break
      }
    }
    
    setCheckInData(checkInDataCopy)
  }
  
  return (
    <main className="relative bg-white h-screen flex flex-col justify-between">
      <div>
      <div className="border-b py-8 px-4">
        <h1 className="text-2xl mb-2 font-semibold">SolFit</h1>
        <p className="text-xl">Hello, <span className="font-semibold">@eiswaffel</span>!</p>
      </div>

      {
          tabIndex === 0 ?
            <Profile
              checkInData={checkInData}
              onRewardClaimed={onRewardClaimed}
              subscriptionData={subscriptionData}
              setSubscriptionData={setSubscriptionData}
              setCheckInData={setCheckInData}
              progressAmount={progressAmount}
              setProgressAmount={setProgressAmount}
            ></Profile>
            :
            <CheckIn performCheckIn={performCheckIn}></CheckIn>
      }
      </div>
      <div className="flex flex-row justify-center py-4 border-t border-slate-300 bg-slate-100">
        {
          subscriptionData.active ?
          <>
          <p className="mr-[100px]" onClick={() => setTabIndex(0)}>Profile</p>
          <p onClick={() => setTabIndex(1)}>Check-In</p>
          </>
          :
          <p onClick={() => setTabIndex(0)}>Profile</p>
        }
      </div>
    </main>
  )
}
