import { combineReducers } from 'redux';
import AuthReducers from './auth.reducers';

const reducers = combineReducers({
    auth: AuthReducers,
});

export default reducers;
