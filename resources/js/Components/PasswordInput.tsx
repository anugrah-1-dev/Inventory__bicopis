import { InputHTMLAttributes, ReactNode, useState } from "react"
import { Eye, EyeOff } from "./Icons";

export default function PasswordInput({label, icon, errorMsg, ...props}: InputHTMLAttributes<HTMLInputElement> &
    {label?: string, icon?: ReactNode, errorMsg: string | undefined}) {
    const [showPass, setShowPass] = useState(false);
    
    return (
        <>
        <label htmlFor={props.id} className={`block mb-1 text-sm font-medium text-gray-900 ${props.required ? "after:content-['*'] after:text-red-500" : "" }`}>{ label }</label>
        <div className="relative">
            {
                icon && 
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500">
                    { icon }
                </div>
            }
            <input type={showPass ? 'text' : 'password'} className={`w-full p-2.5 rounded-md ${icon ? 'ps-10': ''}`} {...props} />
            <button className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-gray-500" type="button" onClick={() => {setShowPass(!showPass)}}>
                {showPass ? 
                    <EyeOff className="w-5 h-5"/> :
                    <Eye className="w-5 h-5"/>
                }
            </button>
        </div>
        {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
        </>
    )
}