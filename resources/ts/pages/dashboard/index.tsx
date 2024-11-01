import React, { ChangeEvent, useState } from 'react';
import Header from '../../componets/dashboard/header';
import BodySystem from './components/systems/BodySystem';
import MenuQuery from '../../query/menus';
import Input from '../../componets/inputs/input';
import ButtonRound from '../../componets/buttons/ButtonRound';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import MenuRepo from '../../repo/menus.repo';
import { MenuRequest } from '../../types/MenuTypes';

const Dashboard = () => {
    const { data, isLoading, refetch } = MenuQuery.useGetMenu();
    const [formName, setFormName] = useState<string>('');
    const queryClient = useQueryClient();
    const createMenu = useMutation({
        mutationFn: MenuRepo.createMenu,
        onSuccess: (newItem) => {
            refetch();
            queryClient.setQueryData(['menu'], (oldData: any) => ({
                ...oldData,
                items: [...oldData.items, newItem], // Asumsikan `newItem` adalah item yang baru dibuat
            }));
            //  console.log('Post updated successfully');
        },
        onError: (error) => {
            //  console.error('Error updating post:', error);
        },
    });

    const handleAddName = () => {
        const body: MenuRequest = {
            parent_id: '',
            title: formName,
            depth: 0,
        };
        createMenu.mutate(body);
    };
    return (
        <div className="my-10 pl-[48px] w-full">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="w-full">
                    {data && (
                        <BodySystem
                            refresh={refetch}
                            data={data}
                            isLoading={isLoading}
                        />
                    )}
                </div>
                <div className="w-full p-20">
                    {!isLoading && data && data?.data.length === 0 && (
                        <div>
                            <Input
                                onChange={(
                                    val: ChangeEvent<HTMLInputElement>
                                ) => setFormName(val.target.value)}
                                variant="success"
                                label="Name"
                                name="name"
                                placeholder="Enter Menu name"
                            />
                            <ButtonRound onClick={handleAddName} type="primary">
                                Save
                            </ButtonRound>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
