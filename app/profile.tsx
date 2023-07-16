import { useState } from 'react'

export default function Profile({ checkInData, onRewardClaimed, subscriptionData, setSubscriptionData }: any) {

  // Testing
  //const [modalState, setModalState] = useState<any>({ active: true, processing: true, message: "Success!" });

  const [modalState, setModalState] = useState<any>({ active: false, processing: false, message: undefined, onDone: undefined });
  
  const [progressAmount, setProgressAmount] = useState<number>(0); 
  
  const onDoneSubscription = () => {
    setSubscriptionData({active: true, month: "July 2023"})
  }

  const onSubscribeClick = () => {
      setModalState({active: true, processing: true, message: <p>You paid <b>$60</b>. Your subscription is active now! \uD83C\uDF89</p>, onDone: onDoneSubscription})
  }

  const onDoneClaim = () => {
    setProgressAmount(progressAmount + 5)
    onRewardClaimed()
  }

  const onClaimClick = () => {
      setModalState({active: true, processing: true, message: <p>SolFit paid you <b>$5</b>! Keep going! \uD83C\uDF89</p>, onDone: onDoneClaim})
  }

  const onModalClick = () => {
    if (modalState.processing) {
      setModalState({ ...modalState, processing: false })
    } else {
      setModalState({ ...modalState, active: false })
      if(modalState.onDone) {
        modalState.onDone()
      }
    }
  }

  return (
    <>
      {
        modalState.active ?
          <div className="fixed top-0 left-0 w-screen h-screen">
            <div className="absolute w-screen h-screen bg-slate-300 opacity-[0.3]">
            </div>

            <div className="absolute flex w-screen h-screen justify-center items-center">
              <div className="rounded-lg border p-5 border-box bg-white text-slate-800 text-xl" onClick={onModalClick}>
                {
                  modalState.processing ? "Processing..." : modalState.message
                }
              </div>
            </div>
          </div>
          :
          null
      }

      {
        !subscriptionData.active ?
          <div className="border-b py-4">
            <p>Become a member for $60 / month!</p>
            <div className="inline-block rounded-full text-white font-semibold bg-blue-500 px-4 py-2 cursor hover:bg-red-500 cursor-pointer" onClick={onSubscribeClick}>Subscribe</div>
          </div>
          :
          <>
            <div className="border-b py-4 px-4">
              <h1 className="text-2xl mb-2">Your <span className="font-semibold">Subscription</span></h1>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between my-2">
                  <span className="font-semibold">Month:</span>
                  <span>{subscriptionData.month}</span>
                </div>

                <div className="flex flex-row justify-between">
                  <span className="font-semibold">Total:</span>
                  <span>$55 ($60 - $5)</span>
                </div>
              </div>
            </div>

            <div className="border-b py-4 px-4">
              <h1 className="text-2xl mb-2">Your <span className="font-semibold">Progress</span></h1>
              <div className="flex flex-col">
                <p className="text-lg">Keep going!</p>
                <div className="flex flex-row justify-between">
                  <p>IMAGE</p>
                  <p>${progressAmount} / $20</p>
                </div>
              </div>
            </div>

            <div className="border-b py-4 px-4">
              <h1 className="text-2xl mb-2">Your <span className="font-semibold">Check-Ins</span></h1>
              <div className="flex flex-col">
                {
                  checkInData.length > 0 ?
                    checkInData.map((checkIn: any) => {
                      return (
                        <div key={checkIn.date} className="flex flex-row justify-between">
                          <p>{checkIn.date}</p>
                          <p>{checkIn.claimed ?
                            "+$5"
                            :
                            <div className="inline-block rounded-full text-white font-semibold bg-blue-500 px-4 py-2 cursor hover:bg-red-500 cursor-pointer" onClick={onClaimClick}>
                              Claim
                            </div>
                            }
                          </p>
                        </div>
                      )
                    }) : "No check-ins yet!"
                }
              </div>
            </div>
          </>

      }
    </>
  )
}