import { User } from './UserType';

interface ResponseType<T> {
    status: string;
    message: string;
    data: T;
}

interface LoginResponse {
    token: string;
    user: User;
}

export type { ResponseType, LoginResponse };
