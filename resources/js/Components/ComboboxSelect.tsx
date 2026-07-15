import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { ArrowUnfold } from "./Icons"
import { useRef, useState } from "react"
import { router } from "@inertiajs/react";

export default function ComboboxSelect({id, label, options, errorMsg, value, customValue = true, placeholder, required, onChange}: &
    {
        id: string
        label: string,
        options: {id: number, name: string}[],
        value: any,
        customValue?: boolean,
        onChange: (value: any) => void,
        placeholder?: string,
        required?: boolean,
        errorMsg?: string | undefined
    }
) {

    const [option, setOption] = useState('');
    const debounce = useRef<number | undefined>();

    const showOption = (data: Record<string, string>) => {
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            router.get('', data, {
                preserveState: true, preserveScroll: true
            });
        }, 500);
    }
    return (
        <>
            <label htmlFor={id} className={`block mb-1 text-sm font-medium text-gray-900 ${required ? "after:content-['*'] after:text-red-500": ''}`}>{label}</label>
            <Combobox value={value} onChange={onChange} onClose={() => setOption('')}>
                <div className="relative">
                    <ComboboxInput
                        displayValue={(option: {name: string}) => option.name}
                        onChange={(event) => {
                            setOption(event.target.value.trim())
                            showOption({[id]: event.target.value.trim()})
                        }}
                        id={id}
                        className="w-full p-2.5 rounded-md"
                        placeholder={placeholder}
                        required={required}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ArrowUnfold className="size-4 text-gray-500" />
                    </ComboboxButton>
                </div>
                
                <ComboboxOptions
                    anchor="bottom start"
                    className="bg-white border border-gray-300 rounded-md"
                >
                {option.trim().length > 0 && options.length == 0  && customValue && (
                    <ComboboxOption
                        value={{ id: 0, name: option }} 
                        className="group flex text-sm cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                    >
                        Tambah satuan<span className="font-medium">"{option}"</span>
                    </ComboboxOption>
                )}
                {options.map((option) => (
                    <ComboboxOption
                        key={option.id}
                        value={option}
                        className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                    >
                        <div className="text-sm/6 text-black">{option.name}</div>
                    </ComboboxOption>
                ))}
                </ComboboxOptions>
            </Combobox>
            {errorMsg && <p className="mt-1 text-xs text-red-600 ">{errorMsg}</p>}
        </>
    )
}