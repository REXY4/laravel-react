// import './bootstrap'; // Uncomment if you're using bootstrap or need to import styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWord from './component/HalloWord'; // Ensure the path is correct

// Check if the element with id 'app' exists before rendering
const rootElement = document.getElementById('app');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <HelloWord />
        </React.StrictMode>
    );
} else {
    console.error("Element with id 'app' not found.");
}
