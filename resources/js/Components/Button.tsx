import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

export default function Button({className = '', children, colorScheme = 'primary', icon, ...props} :
    ButtonHTMLAttributes<HTMLButtonElement> & 
    PropsWithChildren<{
        colorScheme?: 'primary' | 'secondary' | 'warning' | 'danger',
        icon?: ReactNode
    }>) {
    const colors = {
        primary: ' primary ',
        secondary: ' secondary ',
        warning: ' warning ',
        danger: ' danger ',
    } 

    return (
        <button className={'btn' + colors[colorScheme] + className} {...props}>
            {icon}
            {children}
        </button>
    )
}