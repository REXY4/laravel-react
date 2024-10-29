import { LoginResponse, ResponseType } from '../../types/ResponseType';
import { User } from '../../types/UserType';

interface AuthSettingStore {
    user: User | null;
    authLogin(
        email: string,
        password: string
    ): Promise<ResponseType<LoginResponse> | void>;
}

export type { AuthSettingStore };
