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
    <main className="relative">
      <div className="border-b py-4">
        <h1>SolFit</h1>
        <p>Hello, <span className="font-semibold">@eiswaffel</span>!</p>
      </div>

      {
          tabIndex === 0 ?
            <Profile checkInData={checkInData} onRewardClaimed={onRewardClaimed} subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData}></Profile>
            :
            <CheckIn performCheckIn={performCheckIn}></CheckIn>
      }

      <div className="flex flex-row justify-around py-4">
        <p onClick={() => setTabIndex(0)}>Profile</p>
        <p onClick={() => setTabIndex(1)}>Check-In</p>
      </div>
    </main>
  )
}
