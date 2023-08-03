"use client"

export default function LoadingPage({msg}:any) {
  return (

    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="mt-[145px]">
        <div className="loader"></div>
        <p className="mt-4">{msg}</p>
      </div>
    </div>
  )
}
