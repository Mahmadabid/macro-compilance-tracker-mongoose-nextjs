import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';

const Header = () => {
    const { user } = useUser();
    

    return (
        <header className="bg-blue-500 p-4 xsm:px-0 text-white shadow-md relative flex items-center">
            <h1 className="flex-grow text-center text-4xl xsm:text-2xl font-bold">Macro Compliance Tracker</h1>

            {user ? (
                <Link href="/api/auth/logout">
                    <img 
                    src={user.picture || ''}
                    alt="Image"
                    className="ml-auto inline-block h-9 w-9 rounded-full"/>
                </Link>
    ) : (
        <Link href="/api/auth/login">
            <button className="ml-auto text-xl inline-block text-white font-bold">Login</button>
        </Link>
    )
}
        </header >
    );
}  

export default Header;
