import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-modern-drawer/dist/index.css';
import { App } from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
} else {
    console.error("Element with id 'app' not found.");
}
