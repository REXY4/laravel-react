import React, { useState } from 'react';
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    sidebarClasses,
    menuClasses,
} from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { Icon } from '@iconify/react';

interface ItemSidebar {
    id: number;
    icon: string;
    title: string;
}

const SidebarPrimary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const dataSidebar: ItemSidebar[] = [
        {
            id: 1,
            icon: 'material-symbols:folder',
            title: 'Systems',
        },
        {
            id: 2,
            icon: 'material-symbols:folder',
            title: 'System Code',
        },
        {
            id: 3,
            icon: 'material-symbols:folder',
            title: 'Properties',
        },
        {
            id: 4,
            icon: 'material-symbols:folder',
            title: 'Menus',
        },
        {
            id: 5,
            icon: 'material-symbols:folder',
            title: 'App List',
        },
    ];
    return (
        <Sidebar
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    // backgroundColor: 'red',
                    height: '90vh',
                    paddingLeft: '10px',
                    background: '#101828',
                    margin: 24,
                    width: '100%',
                    borderRadius: 24,
                },
            }}
        >
            <div className="flex justify-between items-center h-[84px] w-full p-8 my-5">
                <img src="/logo.svg" alt="Logo" />
                <Hamburger color="white" toggled={isOpen} toggle={setIsOpen} />
            </div>
            <div className="mr-3">
                <div className="bg-[#1D2939] w-full rounded-[15px] pl-5">
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: 'none',
                                // color: '#b6c8d9',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#667085',

                                [`&.active`]: {
                                    backgroundColor: '#13395e',
                                    color: '#ffffff',
                                },
                                '&:hover': {
                                    background: '#9FF443',
                                    width: '90%',
                                    borderRadius: 15,
                                    color: 'rgb(0,0,0,0.2)', // warna teks saat hover
                                },
                                // '&:not(.active)': {
                                //     backgroundColor: 'none', // pastikan tidak ada background saat tidak aktif
                                //     color: '#667085', // warna teks saat tidak aktif
                                // },
                            },
                        }}
                    >
                        {dataSidebar.map((item: ItemSidebar) => {
                            return (
                                <MenuItem className="flex items-center w-full  ">
                                    <div className="flex  item-center  w-full ">
                                        <span className="mr-[16px]">
                                            <Icon
                                                width={24}
                                                height={24}
                                                icon={item.icon}
                                            />
                                        </span>
                                        <span className="text-[18px] ">
                                            {item.title}
                                        </span>
                                    </div>
                                </MenuItem>
                            );
                        })}

                        {/* <SubMenu label="Charts">
                            <MenuItem> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu>
                        <MenuItem> Documentation </MenuItem>
                        <MenuItem> Calendar </MenuItem> */}
                    </Menu>
                </div>
            </div>
        </Sidebar>
    );
};

export default SidebarPrimary;
