import { AnyAction } from 'redux';
import { AuthActionTypes } from '../action-types/auth.action-types';
import { AuthSettingStore } from '../setting-stores/auth.setting.store';
// import { SettingStore } from "../setting-stores/settingStore";
// import { SettingStoreTypes } from "../action-types/settingstore.types";

type AuthStoreState = Omit<AuthSettingStore, 'authLogin'>;

const INITIAL_STATE: AuthStoreState = {
    user: null,
    isLogin: false,
};

const AuthReducers = (
    state: AuthStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.LOGIN: {
            sessionStorage.setItem('_token', action.token);
            return {
                ...state,
                user: action.user,
                isLogin: true,
            };
        }
        default:
            return state;
    }
};

export type { AuthStoreState };
export default AuthReducers;
