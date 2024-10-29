import { LoginResponse, ResponseType } from '../../types/ResponseType';
import { User } from '../../types/UserType';

interface AuthSettingStore {
    user: User | null;
    isLogin: boolean;
    authLogin(
        email: string,
        password: string,
        navigate: Function
    ): Promise<ResponseType<LoginResponse> | void>;
}

export type { AuthSettingStore };
