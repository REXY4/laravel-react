import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { App } from './app';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
            return pages[`./pages/${name}.tsx`];
        },
        setup: ({ App, props }) => (
            <QueryClientProvider client={queryClient}>
                <App {...props} />
            </QueryClientProvider>
        ),
    })
);
