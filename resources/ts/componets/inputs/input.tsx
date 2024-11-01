// src/components/Input.tsx

import React, { useState } from 'react';

type InputProps = {
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number'; // Tipe input
    variant?: 'primary' | 'secondary' | 'success' | 'danger'; // Variasi input
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

const Input: React.FC<InputProps> = ({
    label,
    type = 'text',
    variant = 'primary',
    placeholder,
    value,
    onChange,
    name,
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const variantClasses = {
        primary: 'border-blue-500 focus:ring-blue-500',
        secondary: 'border-gray-300 focus:ring-gray-500',
        success: 'border-gray-100 bg-gray focus:ring-[#1D2939] rounded-[20px]',
        danger: 'border-red-500 focus:ring-red-500',
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-semibold  mb-1 text-gray-700 capitalize">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    name={name}
                    autoComplete="false"
                    type={
                        type === 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : type
                    }
                    className={`block w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${variantClasses[variant]}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A5.968 5.968 0 0012 19a5.968 5.968 0 00-1.875-.175m3.75-1.5A5.968 5.968 0 0012 15a5.968 5.968 0 00-1.875.175m3.75-1.5A5.968 5.968 0 0012 11a5.968 5.968 0 00-1.875.175m3.75-1.5A5.968 5.968 0 0012 7a5.968 5.968 0 00-1.875.175M3.42 6.58C1.48 8.12.01 11.04.01 12c0 1.76 1.25 3.58 3.42 4.58m15.16 0C22.48 15.58 24 13.76 24 12c0-1.96-1.48-3.88-3.42-4.58M10.5 12c0 .28-.03.55-.1.82M4.28 3.72A12.029 12.029 0 0012 4c3.73 0 7.12 1.28 9.65 3.44C22.6 9.24 23 10.62 23 12c0 1.38-.4 2.76-1.35 4.56m-1.17-1.2A8.962 8.962 0 0112 20c-2.67 0-5.1-.88-7.15-2.36M8.65 12c0-.28.03-.55.1-.82"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12c0 1.38.4 2.76 1.35 4.56m0 0A12.04 12.04 0 0112 20c3.73 0 7.12-1.28 9.65-3.44C22.6 14.76 23 13.38 23 12c0-1.38-.4-2.76-1.35-4.56A12.03 12.03 0 0012 4c-2.67 0-5.1.88-7.15 2.36M8.65 12c0 .28.03.55.1.82M17.25 7.5c.36.37.68.78 1 1.25M3.88 5.44c.73-.48 1.62-.92 2.5-1.3M15.75 12c0-.5.03-.99.1-1.47M7 12c0 1.5.5 2.94 1.35 4.25M3 12c0-1.38.4-2.76 1.35-4.56C6.16 5.12 9.58 4 12 4c3.73 0 7.12 1.28 9.65 3.44C22.6 9.24 23 10.62 23 12c0 1.38-.4 2.76-1.35 4.56C19.12 18.72 15.73 20 12 20a12.029 12.029 0 01-8.15-3.36C4.4 15.76 3 14.38 3 12z"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
