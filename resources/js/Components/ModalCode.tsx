import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalCode: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalCode;
