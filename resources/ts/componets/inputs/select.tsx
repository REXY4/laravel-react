// src/components/Select.tsx

import React from 'react';

type SelectProps = {
    name: string;
    label?: string;
    options: { value: string; label: string }[]; // Opsi untuk select
    variant?: 'primary' | 'secondary' | 'success' | 'danger'; // Variasi input
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
};

const Select: React.FC<SelectProps> = ({
    label,
    options,
    variant = 'primary',
    value,
    onChange,
    name,
    required = false,
}) => {
    const variantClasses = {
        primary: 'border-blue-500 focus:ring-blue-500',
        secondary: 'border-gray-300 focus:ring-gray-500',
        success: 'border-green-500 focus:ring-green-500',
        danger: 'border-red-500 focus:ring-red-500',
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-semibold mb-1 text-gray-700 capitalize">
                    {label}
                </label>
            )}
            <select
                name={name}
                className={`block w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${variantClasses[variant]}`}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" disabled>
                    Select an option
                </option>{' '}
                {/* Opsi default */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
