import { PropsWithChildren } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

export default function Modal({
    children,
    show = false,
    onClose,
}: PropsWithChildren<{
    show: boolean | undefined,
    onClose: (value: boolean) => void
}>) {
    return (
        <Dialog open={show} onClose={onClose} className="fixed z-40">
            <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <DialogPanel className="max-w-screen-sm h-fit w-full">
                <div className="flex flex-col relative">
                    {children}
                </div>
            </DialogPanel>
            </div>
        </Dialog>
    )
}
