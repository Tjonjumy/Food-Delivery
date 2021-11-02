import { createSlice } from '@reduxjs/toolkit';

const initialState = {isAuthenticated: false, shopId: null, customerId: null, image: null,};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.customerId = action.payload.customerId;
            state.shopId = action.payload.shopId;
            state.image = action.payload.image;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.customerId = null;
            state.shopId = null;
            state.image = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;