import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';
import { router } from './routers';

export function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
