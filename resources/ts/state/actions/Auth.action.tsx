import { Dispatch } from 'redux';
import authService from '../../services/auth.service';
import { AuthActionTypes } from '../action-types/auth.action-types';

const authLogin =
    (email: string, password: string, navigate: Function) =>
    async (dispatch: Dispatch) => {
        try {
            const response = await authService.authLogin(email, password);
            if (response.status == 'success') {
                dispatch({
                    type: AuthActionTypes.LOGIN,
                    user: response.data.user,
                    token: response.data.token,
                });
                navigate('/dashboard');
                window.location.reload();
            }
        } catch (error) {
            throw error;
        }
    };

const AuthAction = {
    authLogin,
};
export default AuthAction;
