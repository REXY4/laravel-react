import React from 'react';
import Card from '../../componets/cards/Card';
import Input from '../../componets/inputs/input';
import Button from '../../componets/buttons/button';
const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
            <Card title="Login" imageUrl="">
                <Input
                    type="email"
                    variant="secondary"
                    placeholder="Enter your email"
                    label="Email"
                />
                <Input
                    type="password"
                    variant="secondary"
                    placeholder="Enter your password"
                    label="password"
                />
                <div className="my-2">
                    <Button>Login</Button>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
