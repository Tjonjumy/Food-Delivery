import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import foodsReducer from './foods';
import cartReducer from './cart';

const store =configureStore({
    reducer: {auth: authReducer, foods: foodsReducer, cart: cartReducer}
})

export default store;