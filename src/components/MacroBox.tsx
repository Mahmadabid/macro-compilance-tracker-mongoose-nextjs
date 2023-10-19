import { MacroBoxProps } from "@/types/types";

const MacroBox: React.FC<MacroBoxProps> = ({ title, result, target, className }) => {
    const variance = result - target;

    return (
        <div className={`${className} border rounded py-4 px-3 exsm:w-1/4 m-1 text-center`}>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex justify-around">
                <div className="my-2">
                    <span className="text-gray-700 block">Result:</span>
                    <span>{result}</span>
                </div>
                <div className="my-2">
                    <span className="text-gray-700 block">Target:</span>
                    <span>{target}</span>
                </div>
            </div>
            <div className="my-2">
                <span className="text-gray-700">Variance:&nbsp;</span>
                <span className={variance < 0 ? 'text-red-500' : 'text-green-500'}>{variance}</span>
            </div>
        </div>
    );
}

export default MacroBox