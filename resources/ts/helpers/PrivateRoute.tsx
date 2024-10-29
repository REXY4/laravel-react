import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthUseCase from '../use-case/AuthUseCase';

export const PrivateRoute: React.FC = () => {
    const { isLogin } = AuthUseCase();
    if (isLogin && sessionStorage.getItem('_token') !== null) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
};

export const PublicRoute: React.FC = () => {
    const { isLogin } = AuthUseCase();
    if (!isLogin && sessionStorage.getItem('_token') == null) {
        return <Navigate to="/" replace />;
    }
    return <Navigate to="/dashboard" replace />;
};
