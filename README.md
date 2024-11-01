Here is the translated README in English:

---

## Users for testing

```
email : admin@example.com
password : password
```

## Features

-   [x] **Add Folder** - Allows users to create new folders within the system.
-   [x] **Drag and Drop** - Enables users to rearrange folders by dragging and dropping.
-   [x] **Delete Folder** - Provides an option to delete existing folders.
-   [x] **Update Folder** - Allows users to rename or update folder information.

---

Feel free to customize the content above based on the specifics of your project!

# Laravel Vite React Project

This project integrates Laravel as the backend and React as the frontend, configured with Vite for a faster frontend development experience. Vite provides the benefit of speedy builds and instant module refresh during development.

## Prerequisites

Before starting, ensure you have installed:

-   [PHP](https://www.php.net/downloads.php) >= 8.0
-   [Composer](https://getcomposer.org/download/)
-   [Node.js & npm](https://nodejs.org/en/) (LTS version recommended)
-   [Git](https://git-scm.com/downloads)

## Installation Steps

Follow these steps to set up a Laravel project with Vite and React.

### 1. Clone the Repository

```bash
git clone https://github.com/REXY4/laravel-react.git
cd laravel-react
```

### 2. Install Laravel Dependencies

Install all required PHP dependencies for Laravel using Composer:

```bash
composer install
```

### 3. Configure the Environment

Copy the `.env.example` file to `.env` and adjust the database and other environment variables as needed:

```bash
cp .env.example .env
```

Then, generate the Laravel application key:

```bash
php artisan key:generate
```

### 4. Install JavaScript Dependencies

Install the necessary frontend dependencies, including Vite and React:

```bash
npm install
```

### 5. Configure Vite for Laravel and React

In the `vite.config.js` file, add the configuration so Vite can work with Laravel:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Adjust to your React entry path
            refresh: true,
        }),
        react(),
    ],
});
```

Ensure the file `resources/js/app.jsx` (or `.tsx` if using TypeScript) exists as the main entry point for React.

### 6. Create Directory Structure for React

If it doesn’t already exist, create a basic structure for the React application inside the `resources/js` folder:

```bash
mkdir -p resources/js/components
```

Then, create the `app.jsx` file in `resources/js` as the entry point for React:

```javascript
// resources/js/app.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const root = createRoot(document.getElementById('app'));
root.render(<App />);
```

And create the `App.jsx` component inside `resources/ts/components`:

```javascript
// resources/js/components/App.jsx
import React from 'react';

const App = () => {
    return <h1>Hello, React with Laravel & Vite!</h1>;
};

export default App;
```

### 7. Add Root Element in Blade Template

In the `resources/views/welcome.blade.php` file, add a `div` element with `id="app"`:

```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Meta tags and other head content -->
        @vite('resources/js/app.jsx')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

### 8. Run Database Migration (Optional)

If the project requires a database, run migrations:

```bash
php artisan migrate

php artisan db:seed
```

### 9. Run Laravel and Vite Servers

Start both Laravel and Vite servers:

**Laravel Server:**

```bash
composer run dev
```

### 10. Access the Application

Open your application in the browser at `http://localhost:8000`. Vite will automatically handle the React build, and you should see a page displaying “Hello, React with Laravel & Vite!”

## Production Build

When ready for deployment, you can create a production build:

```bash
npm run build
```

The application can then be served using the Laravel server without needing `npm run dev`.

---

Congratulations! You have successfully set up a Laravel project with React and Vite.
