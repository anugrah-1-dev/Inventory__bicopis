import { TableHeader } from "@/types";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { ArrowDown, ArrowUnfold, ArrowUp } from "./Icons";
import { router, usePage, } from "@inertiajs/react";

export default function Table({header, body, children, ...props}: PropsWithChildren<{header: TableHeader[], body: ReactNode[][]}>) {
    const { query } = usePage<{
        query: { col?: string; sort?: string };
      }>().props;
    const [values, setValues] = useState(query || {col: '', sort: ''});
    const debounce = useRef<number | undefined>();
    
    const setSort = (col: string) => {
        const data = values;
        if (col === data.col) {
            if (data.sort === 'desc') {
                data.col = '';
                data.sort = '';
            } else {
                data.sort = 'desc';
            }
        } else {
            data.col = col;
            data.sort = 'asc';
        }
        setValues(data);
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            router.get('', values, {preserveState: true, preserveScroll: true});
        }, 100);
    }

    return (
        <>
            <div className="relative overflow-x-auto border border-gray-200 rounded-lg mb-2">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            {header.map((head, i) => (
                                <>
                                <th scope="col" className="px-6 py-3" key={i}>
                                {
                                    head.sortable && head.name ? 
                                    <button onClick={() => setSort(head.name || '')} disabled={body.length < 1} className="uppercase items-center flex gap-2" key={i}>
                                        {head.label}
                                        {
                                            values?.col === head.name && values?.sort === 'asc' ?
                                            <ArrowUp className="w-4 h-4 text-gray-700"/> : values?.col === head.name && values?.sort === 'desc' ?
                                            <ArrowDown className="w-4 h-4 text-gray-700"/> : <ArrowUnfold  className="w-5 h-5 text-gray-400"/>
                                        }
                                    </button> :
                                    head.label
                                }
                                </th>
                                </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                        body.map((rows, idx) => {
                            return (
                                <>
                                    <tr className="bg-white border-b hover:bg-gray-50" key={`tr-${idx}`}>
                                    {rows.map((data, idx) => <td className="px-6 py-4 text-gray-800" key={`td-${idx}`}>{data}</td>)}
                                    </tr>
                                </>
                            )
                        })
                        }
                        {
                            !body.length && 
                            <tr className="bg-white border-b w-full">
                                <td className="px-6 py-4 text-gray-800" colSpan={header.length}>{children}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}