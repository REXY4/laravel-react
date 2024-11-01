import React, { useEffect } from 'react';
import MenuQuery from '../../../../query/menus';
import LayoutFolderPrimary from './LayoutFolderPrimary';
import { MenuInterface } from '../../../../types/MenuTypes';
import { ResponseType } from '../../../../types/ResponseType';

const BodySystem = ({
    data,
    isLoading,
    refresh,
}: {
    data: ResponseType<MenuInterface[]>;
    isLoading: boolean;
    refresh: any;
}) => {
    // const { data, isLoading, refetch } = MenuQuery.useGetMenu();
    // useEffect(() => {
    //     refetch();
    // }, [update]);
    return (
        <div>
            <div className="mt-10">
                {!isLoading && data !== undefined && (
                    <LayoutFolderPrimary
                        refresh={refresh}
                        isLoading={isLoading}
                        data={data?.data}
                    />
                )}
            </div>
        </div>
    );
};

export default BodySystem;
