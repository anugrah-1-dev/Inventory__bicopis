import { router } from "@inertiajs/react";
import { Search } from "./Icons";
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";

export default function SearchBox({value, placeholder}: InputHTMLAttributes<HTMLInputElement>) {
    const [search, setSearch] = useState(value);
    const debounce = useRef<number | undefined>();

    const searchHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const searchVal = e.target.value.trim();
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            if (searchVal) {
                urlParams.set('search', searchVal);
            } else {
                urlParams.delete('search');
            }
            urlParams.delete('page'); // Reset to page 1 on new search
            
            router.get(window.location.pathname, Object.fromEntries(urlParams), {
                preserveState: true, preserveScroll: true
            });
        }, 500);
    }

    return (
        <div className="relative w-full">
            <input id="search" name="search" onChange={searchHandler} value={search} type="text" className="w-full p-2.5 rounded-md ps-10" placeholder={placeholder} />
            <div className="absolute inset-y-0 start-2.5 flex items-center text-gray-500">
                <Search className="w-5 h-5"/>
            </div>
        </div>
    )
}