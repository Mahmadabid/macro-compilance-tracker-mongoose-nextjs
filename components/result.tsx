import React, {useState, useEffect} from 'react'
import { resultProps } from '../types/result';

const Result = ({results, label}: resultProps) => {

    let [bg, setBg] = useState("");
    let [stats, setStats] = useState("");

    useEffect(() => {
      setBackground()
    });

    const setBackground = () => {

      if(results.gain >= results.target) {
        setBg("bg-green-500");
        setStats("Target achieved")
      } else {
        setBg("bg-red-500")
        setStats("Target not achieved")
      }
    }

    return (
      <div className={"w-1/2 md:w-1/4 lg:w-1/4 p-4 text-black"}>
        <h2 className="text-3xl font-bold">{label}
          <div className="flex flex-wrap justify-between pr-8 pl-8 text-sm p-4">
            <div><span className='text-green-500'>Gain </span>{results.gain}</div>
            <div className="font-bold"><span className='text-blue-500'>Target </span>{results.target}</div>
          </div>
        </h2>
        <h3 className={'text-' + bg.split("bg-")[1] + ' text-xl'}>{"  " + stats}</h3>
        <div className={bg + ' rounded m-2 h-2 w-full'}/>
      </div>
    )
  }

export default Result
