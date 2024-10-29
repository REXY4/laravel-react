import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';
import { PrivateRoute, PublicRoute } from '../helpers/PrivateRoute';
import Dashboard from '../pages/dashboard';
import { DrawerPrimary } from '../componets/drawer';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute />,
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
        ],
    },
]);
