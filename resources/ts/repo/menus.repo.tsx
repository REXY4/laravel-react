import axios from 'axios';
import { LoginResponse, ResponseType } from '../types/ResponseType';
import { MenuInterface, MenuRequest } from '../types/MenuTypes';

const getMenu = async (): Promise<ResponseType<MenuInterface[]>> => {
    try {
        const response = await axios.get<ResponseType<MenuInterface[]>>(
            'api/v1/menus',
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('_token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createMenu = async (body: MenuRequest): Promise<any> => {
    try {
        const response = await axios.post<ResponseType<MenuInterface[]>>(
            'api/v1/menus',
            body,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('_token')}`,
                },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const updateMenu = async (body: {
    id: string;
    title: string;
    parent_id: string;
    dept: number;
}): Promise<any> => {
    try {
        const response = await axios.post<ResponseType<MenuInterface[]>>(
            'api/v1/menus' + body.id,
            body,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('_token')}`,
                },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteMenu = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete<ResponseType<MenuInterface[]>>(
            'api/v1/menus/' + id,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('_token')}`,
                },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const MenuRepo = {
    getMenu,
    createMenu,
    deleteMenu,
    updateMenu,
};

export default MenuRepo;
