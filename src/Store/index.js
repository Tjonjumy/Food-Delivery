import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import foodsReducer from './foods';
import cartReducer from './cart';
import orderReducer from './order';

const store = configureStore({
    reducer: { 
        auth: authReducer, 
        foods: foodsReducer, 
        cart: cartReducer,
        order: orderReducer,
    }
})

export default store;