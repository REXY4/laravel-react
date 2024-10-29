import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
const DrawerPrimary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <Drawer
            open={true}
            onClose={toggleDrawer}
            direction="left"
            className=""
            zIndex={0}
        >
            <div>
                <h1>Hallo</h1>
            </div>
        </Drawer>
    );
};

export default DrawerPrimary;
