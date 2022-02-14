import Head from 'next/head'
import React, { useState } from 'react';
import Form from '../components/forms';
import Result from '../components/result';
import dayjs from "dayjs";
import Github from '../components/github';
import { config } from 'dotenv';
config();

export const Home = ({data}) => {

  // To reset the Form
  var FormID = 'compliance';
  let resetForm: HTMLFormElement = document.querySelector(FormID);

  // Get results from API
  const [results, setResults] = useState(data);

  // Get the form data
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...results };
    let name = e.target.name;
    let nameArr = name.split(" ");

    let resultType = nameArr[0].toLowerCase();
    let resultMacro = nameArr[1].toLowerCase();

    data[resultMacro][resultType] = e.target.value? e.target.value: 0;

    setResults(data);
  }

  // Get the data from next day
  const getDataForNextDay = async() => {
    const currentDate = dayjs(results.date);
    const nextDate = currentDate.add(1, 'day');
    const nextDateString = nextDate.format('YYYY-MM-DD');   
    const response = await fetch(`${process.env.API_URL}?date=${nextDateString}`);
    const json = await response.json();
    
    setResults(json.data);

    resetForm.reset();
  }

  // Get the data from previous day
  const getDataForPreviousDay = async() => {
    const currentDate = dayjs(results.date);
    const previousDate = currentDate.subtract(1, 'day');
    const previousDateString = previousDate.format('YYYY-MM-DD');
    const response = await fetch(`${process.env.API_URL}?date=${previousDateString}`);
    const json = await response.json();
    
    setResults(json.data);
    
    resetForm.reset();
  }

  // Post the data to the API
  const postData = async() => {
    await fetch(process.env.API_URL , {
      method: 'POST',
      body: JSON.stringify(results),
    });
    
    resetForm.reset();
  }

  return (
    <div>
      <Head>
        <title>Compliance Tracker</title>
        <meta name="description" content="Track your dail food intake with compliance tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-auto md:h-16 lg:h-16 bg-violet-500 flex items-center place-content-center">
        <h1 className='text-white text-2xl md:text-4xl mr-5 lg:text-4xl font-bold'>Macro Compliance Tracker </h1>
        <a href="" className='absolute right-0 top-0 xxsm:relative'><Github /></a>
      </div>
      <div className="flex text-center">
        <div className="w-1/3 bg-gray-200 p-4"><button onClick={getDataForPreviousDay}>Previous Day</button></div>
        <div className="w-1/3 p-4">{dayjs(results.date).format('MM/DD/YYYY')}</div>
        <div className="w-1/3 bg-gray-200 p-4"><button onClick={getDataForNextDay}>Next Day</button></div>
      </div>
      <div className="flex mb-4 ml-1 mr-4 text-center justify-around flex-wrap">
        <Result results={results.calories} label="Calories" />
        <Result results={results.carbs} label="Carbs" />
        <Result results={results.fat} label="Fat" />
        <Result results={results.protein} label="Protein" />
      </div>
      <div className='flex flex-wrap'>
        <Form onChange={onChange} label="Target" />
        <Form onChange={onChange} label="Gain" />
      </div>
      <div className="flex text-center">
        <div className="w-full">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full mb-6 text-xl" onClick={postData}>
              Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Get the data from the API and pass it to the Home component
Home.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}?date=${dayjs().format('YYYY-MM-DD')}`);
  const json = await response.json();
  return {data: json.data};
}

export default Home;