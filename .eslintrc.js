module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Integrasi Prettier
    ],
    parser: '@babel/eslint-parser', // Jika menggunakan JSX
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Tidak perlu mengimpor React mulai React 17
      'prettier/prettier': 'error', // Menandai masalah Prettier sebagai kesalahan
    },
    settings: {
      react: {
        version: 'detect', // Mendeteksi versi React
      },
    },
  };
  