import { useDispatch, useSelector } from 'react-redux';
import { AuthSettingStore } from '../state/setting-stores/auth.setting.store';
import { AppRootState } from '../state/stores';
import { AuthStoreState } from '../state/reducers/auth.reducers';
import { useCallback } from 'react';
import AuthAction from '../state/actions/Auth.action';

const selector = (state: AppRootState) => state.auth;

const AuthUseCase = (): AuthSettingStore => {
    const { user } = useSelector<AppRootState, AuthStoreState>(selector);
    const dispatch = useDispatch();
    const authLogin = useCallback(
        (email: string, password: string) =>
            AuthAction.authLogin(email, password)(dispatch),
        [dispatch]
    );
    return {
        user,
        authLogin,
    };
};

export default AuthUseCase;
