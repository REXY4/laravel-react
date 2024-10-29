import { Dispatch } from 'redux';
import { AuthActionTypes } from '../action-types/auth.action-types';
import authRepo from '../../repo/auth.repo';
import authService from '../../services/auth.service';

const authLogin =
    (email: string, password: string) => async (dispatch: Dispatch) => {
        try {
            const response = await authService.authLogin(email, password);
            dispatch({
                type: AuthActionTypes.LOGIN,
            });
        } catch (error) {
            throw error;
        }
    };

const AuthAction = {
    authLogin,
};
export default AuthAction;
