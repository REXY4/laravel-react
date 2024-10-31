import { useQuery } from '@tanstack/react-query';
import MenuRepo from '../repo/menus.repo';
import { MenuRequest } from '../types/MenuTypes';
import { ResponseType } from '../types/ResponseType';

export const useGetMenu = () => {
    return useQuery({
        queryKey: ['menus'], // Key unik untuk query ini
        queryFn: MenuRepo.getMenu, // Fungsi untuk mengambil data
        staleTime: 1000 * 60 * 5, // Data disimpan selama 5 menit sebelum dianggap "stale"
    });
};

const MenuQuery = {
    useGetMenu,
};

export default MenuQuery;
