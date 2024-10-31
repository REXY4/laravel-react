import React from 'react';
import Header from '../../componets/dashboard/header';
import BodySystem from './components/systems/BodySystem';
import Hirarky from './components/systems/LayoutFolder';

const Dashboard = () => {
    return (
        <div className="my-10 pl-[48px] w-full">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="w-full">
                    <BodySystem />
                </div>
                <div className="w-full">{/* Konten untuk bagian kedua */}</div>
            </div>
        </div>
    );
};

export default Dashboard;
