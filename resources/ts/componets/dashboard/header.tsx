import { Icon } from '@iconify/react';
import React from 'react';

const Header = () => {
    return (
        <div>
            <div className="flex items-center">
                <Icon color="#D0D5DD" icon={'material-symbols:folder'} />
                <span className="mx-2">/</span>{' '}
                {/* Tambahkan margin horizontal untuk pemisahan */}
                <p className="text-custom-gray text-[14px]">Menu</p>
            </div>
            <div className="flex items-center mt-10">
                <img src="/icon/icon-title.svg " />
                <h1 className="text-custom-black ml-3 text-[32px] font-bold">
                    Menu
                </h1>
            </div>
        </div>
    );
};

export default Header;
