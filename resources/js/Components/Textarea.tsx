import { TextareaHTMLAttributes } from "react";

export default function Textarea({id, label, errorMsg, ...props}: TextareaHTMLAttributes<HTMLTextAreaElement> &
    {
        label: string,
        errorMsg?: string
    }
) {
    return (
        <>
            <label htmlFor={id} className={`block mb-1 text-sm font-medium text-gray-900 ${props.required ? "after:content-['*'] after:text-red-500" : "" }`}>{label}</label>
            <textarea id={id} className="w-full p-2.5 rounded-md bg-gray-50 border border-gray-300" {...props}></textarea>
            {errorMsg && <p className="mt-1 text-xs text-red-600 ">{errorMsg}</p>}
        </>
    )
}