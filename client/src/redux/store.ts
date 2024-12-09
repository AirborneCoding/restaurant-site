import { configureStore } from '@reduxjs/toolkit';

// clients
import usersReducer from './slices/clients';

import orderReducer from './slices/order'

export const makeStore = () => {
    return configureStore({
        reducer: {
            // clients
            users: usersReducer,

            orders: orderReducer
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];