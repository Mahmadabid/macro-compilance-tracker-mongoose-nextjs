import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import Dates from "@/components/Dates";
import Form from "@/components/Form";
import MacroBox from "@/components/MacroBox";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { FormInput, MacroData } from "@/types/types";

export default function Home() {
    const { user } = useUser();

    const [macroData, setMacroData] = useState<MacroData | null>(null);
    const [state, setState] = useState({
        press: false,
        date: new Date().toISOString().split('T')[0],
        resultForm: {
            calories: "",
            proteins: "",
            carbs: "",
            fats: ""
        },
        targetForm: {
            calories: "",
            proteins: "",
            carbs: "",
            fats: ""
        }
    });

    const fetchData = async () => {
        const url = `/api/data?userId=${user?.sub}&date=${state.date}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                setMacroData(data[0].macros);
            } else {
                // if no data is present for the date, initialize with default values
                setMacroData({
                    calories: {
                        target: 0,
                        result: 0
                    },
                    proteins: {
                        target: 0,
                        result: 0
                    },
                    carbs: {
                        target: 0,
                        result: 0
                    },
                    fats: {
                        target: 0,
                        result: 0
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching user macro data:", error);
        }
    };


    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, state.date]);

    const sendForm = async (dataToSend: { userId: string | undefined; date: string; macros: MacroData }) => {
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            if (!response.ok) throw new Error('Failed to save data');
            await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const updatedData = {
            userId: user?.sub || undefined,
            date: state.date,
            macros: {
                calories: {
                    target: parseInt(state.targetForm.calories) || macroData?.calories.target || 0,
                    result: parseInt(state.resultForm.calories) || macroData?.calories.result || 0
                },
                proteins: {
                    target: parseInt(state.targetForm.proteins) || macroData?.proteins.target || 0,
                    result: parseInt(state.resultForm.proteins) || macroData?.proteins.result || 0
                },
                fats: {
                    target: parseInt(state.targetForm.fats) || macroData?.fats.target || 0,
                    result: parseInt(state.resultForm.fats) || macroData?.fats.result || 0
                },
                carbs: {
                    target: parseInt(state.targetForm.carbs) || macroData?.carbs.target || 0,
                    result: parseInt(state.resultForm.carbs) || macroData?.carbs.result || 0
                }
            }
        };

        if (state.press) {
            sendForm(updatedData);
            setState(prev => ({ ...prev, press: false }));
        }
    }, [user, state, macroData]);

    const changeDate = (days: number) => {
        const currentDay = new Date(state.date);
        currentDay.setDate(currentDay.getDate() + days);
        setState(prev => ({ ...prev, date: currentDay.toISOString().split('T')[0] }));
    };

    return (
        <main>
            {user ? (
                <>
                    <Header />
                    <h4 className="text-center text-2xl m-4 text-cyan-600">Hey! <span className="font-bold">{user.name}</span></h4>
                    <p className="text-xl p-4 text-center">
                        This app will help you ensure your macros are within a selected range!
                    </p>
                    <Dates date={state.date} onNext={() => changeDate(1)} onPrev={() => changeDate(-1)} />

                    <div className="xsm:grid xsm:grid-cols-2 flex">
                        <MacroBox className="bg-yellow-200" title="Calories" target={macroData?.calories.target || 0} result={macroData?.calories.result || 0} />
                        <MacroBox className="bg-green-200" title="Proteins" target={macroData?.proteins.target || 0} result={macroData?.proteins.result || 0} />
                        <MacroBox className="bg-blue-200" title="Carbs" target={macroData?.carbs.target || 0} result={macroData?.carbs.result || 0} />
                        <MacroBox className="bg-red-200" title="Fats" target={macroData?.fats.target || 0} result={macroData?.fats.result || 0} />
                    </div>

                    <div className="flex justify-around p-4">
                        <Form heading="Result" onSave={(data: FormInput) => setState(prev => ({ ...prev, resultForm: data }))} setPress={() => setState(prev => ({ ...prev, press: true }))} />
                        <Form heading="Target" onSave={(data: FormInput) => setState(prev => ({ ...prev, targetForm: data }))} setPress={() => setState(prev => ({ ...prev, press: true }))} />
                    </div>
                </>
            ) : (
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <p className="text-center text-xl mb-4">Please login to track your macros.</p>
                        <Link href="/api/auth/login"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button></Link>
                    </div>
                </div>
            )}
        </main>
    );
}
