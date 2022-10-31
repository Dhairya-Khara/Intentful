import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


import authReducer from "./authReducer"

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default configureStore({
    reducer: {
        auth: persistedReducer
    }
})
