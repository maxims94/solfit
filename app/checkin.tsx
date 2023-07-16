import { useCallback } from "react"

export default function CheckIn({ performCheckIn }: { performCheckIn: (date: string) => void }) {

    const onSubmit = useCallback((event: any) => {
        event.preventDefault()
        const date = event.target.date.value;
        performCheckIn(date);
    }, []);

    return (
        <>
            <div className="border-b py-4">
                <h1 className="font-semibold">Check-In</h1>
                <form onSubmit={onSubmit}>
                    <label className="block">
                        Date:
                        <input id="date" type="text" size={10} defaultValue="02.07.2023" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}