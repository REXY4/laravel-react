import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [''], // blacklist datanya tidak di masukan ke dalam storage
    whitelist: ['setting', 'auth'], // klw withe list data nya di masukan ke dalam storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
export let store = createStore(persistedReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof store.getState>;
export let persistore = persistStore(store);
