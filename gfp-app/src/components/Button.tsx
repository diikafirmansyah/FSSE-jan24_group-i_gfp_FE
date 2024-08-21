// components/Button.tsx
import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label}
        </button>
    );
};

export default Button;
