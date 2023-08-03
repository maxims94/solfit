"use client"

export default function CheckIn({onSubmit}:any) {
  return (

    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center mt-5">

        <div className="mt-5 text-xl font-bold mb-5">Check-in</div>

        <form onSubmit={onSubmit}>
            <label className="flex flex-row items-center">
                <span className="mr-4 text-lg">Date:</span>
                <input id="date" type="text" size={10} defaultValue="02.07.2023" className="border p-2"/>
            </label>
            <input type="submit" value="Submit" className="purple-button mt-4 cursor-pointer"/>
        </form>
      </div>
    </div>
  )
}
