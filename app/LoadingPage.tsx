"use client"

export default function LoadingPage({msg}:{string}) {
  return (

    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="mt-5">
        <div className="loader"></div>
        <p className="mt-4">{msg}</p>
      </div>
    </div>
  )
}
