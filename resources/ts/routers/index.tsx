import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: 'about',
        element: <div>About</div>,
    },
]);
