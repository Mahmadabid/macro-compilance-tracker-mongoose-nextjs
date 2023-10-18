import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import Dates from "@/components/Dates";
import Form from "@/components/Form";
import MacroBox from "@/components/MacroBox";
import Link from 'next/link';

export default function Home() {
    const { user } = useUser();

    return (
        <main>
            {user ? (
                <>
                    <Header />
                    <h4 className="text-center text-2xl m-4 text-cyan-600">Hey! <span className="font-bold">{user.name}</span></h4>
                    <p className="text-xl p-4 text-center">
                        This app will help you ensure your macros are within a selected range!
                    </p>
                    <Dates />

                    <div className="xsm:grid xsm:grid-cols-2 flex">
                        <MacroBox className="bg-yellow-200" title="Calories" target={200} result={100} />
                        <MacroBox className="bg-green-200" title="Proteins" target={200} result={100} />
                        <MacroBox className="bg-blue-200" title="Carbs" target={200} result={100} />
                        <MacroBox className="bg-red-200" title="Fats" target={200} result={100} />
                    </div>


                    <div className="flex justify-around p-4">
                        <Form heading="Target" />
                        <Form heading="Result" />
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
