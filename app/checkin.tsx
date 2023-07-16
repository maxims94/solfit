import { useCallback } from "react"

export default function CheckIn({ performCheckIn }: { performCheckIn: (date: string) => void }) {

    const onSubmit = useCallback((event: any) => {
        event.preventDefault()
        const date = event.target.date.value;
        performCheckIn(date);
    }, []);

    return (
        <>
            <div className="py-8 px-4">
              <h1 className="text-2xl mb-2">Register <span className="font-semibold">Check-In</span></h1>

                <form onSubmit={onSubmit}>
                    <label className="flex flex-row items-center">
                        <span className="mr-4 text-lg">Date:</span>
                        <input id="date" type="text" size={10} defaultValue="02.07.2023" className="border p-2"/>
                    </label>
                    <input type="submit" value="Submit" className="mt-4 inline-block rounded-full text-white font-bold bg-blue-500 px-4 py-2 cursor hover:bg-red-500 cursor-pointer"/>
                </form>
            </div>
        </>
    )
}