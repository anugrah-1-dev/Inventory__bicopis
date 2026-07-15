import { InputHTMLAttributes, ReactNode } from "react"

export default function TextInput({label, icon, type, errorMsg, ...props}: InputHTMLAttributes<HTMLInputElement> &
    {label?: string, icon?: ReactNode, errorMsg?: string | undefined}) {
    
    return (
        <>
        <label htmlFor={props.id} className={`block mb-1 text-sm font-medium text-gray-900 ${props.required ? "after:content-['*'] after:text-red-500" : "" }`}>{label}</label>
        <div className="relative">
            <input type={type ? type : 'text'} className={`w-full p-2.5 rounded-md ${icon ? 'ps-10': ''}`} {...props}/>
            {
                icon && 
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500">
                    { icon }
                </div>
            }
        </div>
        {errorMsg && <p className="mt-1 text-xs text-red-600 ">{errorMsg}</p>}
        </>
    )
}