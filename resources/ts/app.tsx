import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { router } from './routers';
import { persistore, store } from './state/stores';
import { SidebarPrimary } from './componets/sidebars';

export function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistore}>
                <div className="flex">
                    {sessionStorage.getItem('_token') !== null && (
                        <div className="mr-10">
                            <SidebarPrimary />
                        </div>
                    )}
                    <RouterProvider router={router} />
                </div>
            </PersistGate>
        </Provider>
    );
}
