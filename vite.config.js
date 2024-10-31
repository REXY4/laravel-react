import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/index.tsx'],
            refresh: true,
            ssr: 'resources/ts/ssr.tsx',
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        },
    },
});
