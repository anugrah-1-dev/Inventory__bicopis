import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                {/* <Link
                    href="/"
                    className="p-1 flex items-center justify-between mr-4"
                >
                    <img
                        src="/logo_bicopi.jpeg"
                        alt="Bicopis Logo"
                        className="h-10 w-auto"
                    />
                </Link> */}
                 <Link href="/" className="flex items-center justify-between mr-4">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Bicopis.</span>
                    </Link>
            </div>
        </nav>
    );
}
