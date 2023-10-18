import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';

const Header = () => {
    const { user } = useUser();
    const userInitial = user?.name?.charAt(0).toUpperCase();

    return (
        <header className="bg-blue-500 p-4 xsm:px-0 text-white shadow-md relative flex items-center">
            <h1 className="flex-grow text-center text-4xl xsm:text-2xl font-bold">Macro Compliance Tracker</h1>

            {user ? (
                <Link href="/api/auth/logout">
                    <button className="ml-auto inline-block h-9 w-9 text-xl rounded-full bg-white font-bold text-green-500">{userInitial}</button>
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
