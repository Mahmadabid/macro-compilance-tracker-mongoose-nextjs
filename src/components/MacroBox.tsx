type MacroBoxProps = {
    title: string;
    result: number;
    target: number;
    className?: string;
};

const MacroBox: React.FC<MacroBoxProps> = ({ title, result, target, className }) => {
    const variance = result - target;

    return (
        <div className={`${className} border rounded p-4 m-1 exsm:w-1/4 text-center`}>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex justify-around">
                <div className="my-2">
                    <span className="text-gray-700">Result: </span>
                    <span>{result}</span>
                </div>
                <div className="my-2">
                    <span className="text-gray-700">Target: </span>
                    <span>{target}</span>
                </div>
            </div>
            <div className="my-2">
                <span className="text-gray-700">Variance: </span>
                <span className={variance < 0 ? 'text-red-500' : 'text-green-500'}>{variance}</span>
            </div>
        </div>
    );
}

export default MacroBox;
