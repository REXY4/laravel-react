import React from 'react';
import Button from '../buttons/button';

interface Props {
    children: React.ReactNode;
    imageUrl?: string;
    title: string;
    footer?: React.ReactNode;
}

const Card = ({ children, imageUrl, title, footer }: Props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-full p-5">
            {imageUrl ? (
                <img
                    className="w-full h-48 object-cover"
                    src={imageUrl}
                    alt={title}
                />
            ) : (
                <h5 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    {title}
                </h5>
            )}
            <div className="px-6 py-4">{children}</div>
            {footer !== undefined && (
                <div className="px-6 pt-4 pb-2">{footer}</div>
            )}
        </div>
    );
};

export default Card;
