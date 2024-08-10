// components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[300px] px-4 py-2 bg-blue-500 text-white rounded transform transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
    >
      {label}
    </button>
  );
};

export default Button;
