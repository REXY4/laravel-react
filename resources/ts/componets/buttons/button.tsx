// src/components/Button.tsx

import React from 'react';

// Mendefinisikan prop type untuk Button
type ButtonProps = {
    type?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark';
    onClick?: () => void;
    children: React.ReactNode;
};

// Membuat komponen Button
const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    children,
    onClick,
    ...props
}) => {
    // Menentukan kelas Tailwind CSS berdasarkan tipe tombol
    const buttonTypes: Record<string, string> = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white w-full',
        secondary: 'bg-gray-500 hover:bg-gray-700 text-white w-full',
        success: 'bg-green-500 hover:bg-green-700 text-white w-full',
        danger: 'bg-red-500 hover:bg-red-700 text-white w-full',
        warning: 'bg-yellow-500 hover:bg-yellow-700 text-white w-full',
        info: 'bg-teal-500 hover:bg-teal-700 text-white w-full',
        light: 'bg-gray-200 hover:bg-gray-300 text-gray-800 w-full',
        dark: 'bg-black hover:bg-gray-800 text-white w-full',
    };

    const buttonClass = `${buttonTypes[type]} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;

    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
