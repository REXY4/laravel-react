import React, { ChangeEvent, useState } from 'react';
import Card from '../../componets/cards/Card';
import Input from '../../componets/inputs/input';
import Button from '../../componets/buttons/button';
import AuthUseCase from '../../use-case/AuthUseCase';
import { useNavigate } from 'react-router-dom';

interface LoginRequest {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { authLogin } = AuthUseCase();
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev: LoginRequest) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async () => {
        await authLogin(form.email, form.password, navigate);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
            <Card title="Login" imageUrl="">
                <Input
                    name="email"
                    type="email"
                    variant="secondary"
                    placeholder="Enter your email"
                    label="Email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                    }
                />
                <Input
                    name="password"
                    type="password"
                    variant="secondary"
                    placeholder="Enter your password"
                    label="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                    }
                />
                <div className="my-2">
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
