import React, { useState } from 'react';
import ButtonRound from '../../../../componets/buttons/ButtonRound';
import Select from '../../../../componets/inputs/select';
import LayoutFolderPrimary from './LayoutFolderPrimary';
import MenuQuery from '../../../../query/menus';

import MenuRepo from '../../../../repo/menus.repo';

const BodySystem = () => {
    const { data, isLoading } = MenuQuery.useGetMenu();
    const [buttonExpand, setButtonExpand] = useState<boolean>(true);
    const handleButtonExpand = () => {
        setButtonExpand(!buttonExpand);
    };

    return (
        <div>
            <div className="w-[50%]">
                <Select
                    variant="secondary"
                    name="menu"
                    options={[
                        {
                            label: 'System Management',
                            value: 'System Management',
                        },
                    ]}
                    label="Menu"
                />
            </div>
            <div className="flex mt-[48px]">
                <div className="w-[133px] mr-[8px]">
                    <ButtonRound
                        onClick={handleButtonExpand}
                        type={!buttonExpand ? 'light' : 'secondary'}
                    >
                        Expand All
                    </ButtonRound>
                </div>
                <div className="w-[133px]">
                    <ButtonRound
                        onClick={handleButtonExpand}
                        type={buttonExpand ? 'light' : 'secondary'}
                    >
                        Collapse All
                    </ButtonRound>
                </div>
            </div>
            <div className="mt-10">
                {!isLoading && data !== undefined && (
                    <LayoutFolderPrimary data={data?.data} />
                )}
            </div>
        </div>
    );
};

export default BodySystem;
