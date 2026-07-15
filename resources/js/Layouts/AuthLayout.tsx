import {
    Archive,
    Box,
    Groups,
    Dashboard,
    Logout,
    Person,
    Unarchive,
} from "@/Components/Icons";
import { User } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

export default function AuthLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const [toggle, setToggle] = useState(false);
    const { url } = usePage();

    return (
        <div className="antialiased bg-slate-50">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-30">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            className="p-2 mr-2 text-gray-600 rounded-md cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                            onClick={() => {
                                setToggle(!toggle);
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <Link
                            href="/"
                            className="flex items-center justify-between mr-4"
                        >
                            <img
                                src="/logo-mitra.png"
                                alt="Brilliant Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <Popover className="relative">
                            <PopoverButton className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-primary-500 rounded-full hover:ring hover:ring-primary-200">
                                <span className="font-medium text-white">
                                    {user.name[0]}
                                </span>
                            </PopoverButton>
                            <PopoverPanel
                                anchor="bottom end"
                                className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">
                                        {user.name}
                                    </span>
                                    <span className="block text-xs text-gray-500 truncate">
                                        {user.email}
                                    </span>
                                </div>
                                <ul
                                    className="py-2"
                                    aria-labelledby="user-menu-button"
                                >
                                    <li className="text-gray-700">
                                        <Link
                                            href="/account"
                                            className="w-full items-center px-4 py-2 text-sm hover:bg-gray-100 flex gap-2"
                                        >
                                            <Person className="w-4 h-4" />
                                            Akun saya
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-start items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
                                        >
                                            <Logout className="w-4 h-4" />
                                            Keluar
                                        </Link>
                                    </li>
                                </ul>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>
            </nav>

            <aside
                className={`fixed z-20 top-0 left-0 w-64 h-screen pt-14 transition-transform ${
                    toggle
                        ? "translate-x-0 md:-translate-x-full"
                        : "-translate-x-full md:translate-x-0"
                } bg-white border-r border-gray-200`}
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full bg-white">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/dashboard")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Dashboard className="w-5 h-5" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/products")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Box className="w-5 h-5" />
                                Data Barang
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/distributors"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/distributors")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Groups className="w-5 h-5" />
                                Data Distributor
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/product-in"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/product-in")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Archive className="w-5 h-5" />
                                Barang Masuk
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/product-out"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/product-out")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Unarchive className="w-5 h-5" />
                                Barang Keluar
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account"
                                className={`flex items-center gap-2 py-2 px-5 rounded-md text-base font-medium ${
                                    url.startsWith("/account")
                                        ? "text-white bg-primary-500 hover:bg-primary-600"
                                        : "text-gray-900 rounded hover:bg-primary-50"
                                }`}
                            >
                                <Person className="w-5 h-5" />
                                Akun
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <main
                className={`p-4 z-0 ${
                    toggle ? "" : "md:ml-64"
                } h-full min-h-screen pt-20`}
            >
                <span
                    className={`md:hidden fixed top-0 left-0 h-full bg-black/60 backdrop-blur-sm w-full z-10 ${
                        !toggle && "hidden"
                    }`}
                    onClick={() => setToggle(false)}
                ></span>
                {children}
            </main>
        </div>
    );
}
