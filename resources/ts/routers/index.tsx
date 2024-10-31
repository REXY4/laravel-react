import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';
import { PrivateRoute, PublicRoute } from '../helpers/PrivateRoute';
import Dashboard from '../pages/dashboard';
import Systems from '../pages/dashboard/systems';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
        children: [
            {
                path: '',
                element: <LoginPage />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            // {
            //     path: '/systems',
            //     element: <Systems />,
            // },
        ],
    },
]);
