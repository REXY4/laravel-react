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
    active: boolean;
}

const SidebarPrimary = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const dataSidebar: ItemSidebar[] = [
        {
            id: 1,
            icon: 'material-symbols:folder',
            title: 'Systems',
            active: false,
        },
        {
            id: 2,
            icon: 'hugeicons:menu-square',
            title: 'System Code',
            active: false,
        },
        {
            id: 3,
            icon: 'hugeicons:menu-square',
            title: 'Properties',
            active: false,
        },
        {
            id: 4,
            icon: 'hugeicons:menu-square',
            title: 'Menus',
            active: true,
        },
        {
            id: 5,
            icon: 'hugeicons:menu-square',
            title: 'App List',
            active: false,
        },
    ];
    return (
        <Sidebar
            toggled={isOpen}
            rootStyles={{
                height: '100%',
                width: isOpen ? '100%' : '0%',
                margin: 24,
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'red',
                    paddingLeft: '10px',
                    background: '#101828',
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
                                display: 'flex',
                                alignItems: 'center',
                                color: '#667085',

                                [`&.${menuClasses.active}`]: {
                                    background: '#9FF443',
                                    width: '90%',
                                    borderRadius: 15,
                                    color: 'rgb(0,0,0,0.2)', // warna teks saat hover
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
                                <MenuItem
                                    className="flex items-center w-full  "
                                    active={item.active}
                                >
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
                    </Menu>
                </div>
            </div>
        </Sidebar>
    );
};

export default SidebarPrimary;
