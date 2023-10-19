import { DateProps } from "@/types/types"

const Dates: React.FC<DateProps> = ({date, onNext, onPrev}) => {
    return (
        <div className="grid grid-cols-3 py-2 gap-2 text-center">
            <button onClick={onPrev} className="bg-gray-200 p-2">Previous Day</button>
            <div className="p-2">{date}</div>
            <button onClick={onNext} className="bg-gray-200 p-2">next Day</button>
        </div>
    )
}

export default Dates