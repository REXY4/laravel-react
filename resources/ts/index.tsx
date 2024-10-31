import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-modern-drawer/dist/index.css';
import { App } from './app';

// import { App } from './app';

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Element with id 'app' not found.");
}
