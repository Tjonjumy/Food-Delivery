import { createSlice } from "@reduxjs/toolkit";

const orderSclie = createSlice({
    name: 'order',
    initialState: {
        orders: [],
    },
    reducers: {
        
        setOrderData(state, action) {
            state.orders = action.payload;
        }
    }
});

export const orderActions = orderSclie.actions;

export default orderSclie.reducer;