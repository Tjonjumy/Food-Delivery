import { createSlice } from '@reduxjs/toolkit';

const initialState = {isAuthenticated: false};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;
console.log('authSlice', authSlice)
export default authSlice.reducer;