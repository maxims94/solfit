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
              <h1 className="text-lg mb-2 mt-4">Check-In</h1>

                <form onSubmit={onSubmit}>
                    <label className="flex flex-row items-center">
                        <span className="mr-4 text-lg">Date:</span>
                        <input id="date" type="text" size={10} defaultValue="02.07.2023" className="border p-2"/>
                    </label>
                    <input type="submit" value="Submit" className="purple-button"/>
                </form>
            </div>
        </>
    )
}
