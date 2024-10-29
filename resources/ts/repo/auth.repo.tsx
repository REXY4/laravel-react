import axios from 'axios';
import { LoginResponse, ResponseType } from '../types/ResponseType';

const authLogin = async (
    email: string,
    password: string
): Promise<ResponseType<LoginResponse>> => {
    try {
        const response = await axios.post<ResponseType<LoginResponse>>(
            '/login',
            {
                email,
                password,
            }
        );
        const { token } = response.data.data;
        sessionStorage.setItem('authToken', token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const authRepo = {
    authLogin,
};

export default authRepo;
