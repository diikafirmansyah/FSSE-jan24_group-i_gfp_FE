// components/Button.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    icon?: IconDefinition; // Add icon prop
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, className, icon }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            <span>{label}</span>
        </button>
    );
};

export default Button;
