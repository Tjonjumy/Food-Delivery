import { createSlice } from '@reduxjs/toolkit';

const initialState = {items: [], total: 0};

const foodsSlice = createSlice({
    name: 'food',
    initialState: initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload.items;
            state.total = action.payload.total;
        },
        addItem(state, action) {
            state.items.push(action.payload);
            state.total++;
        },
    }
});

export const foodsActions = foodsSlice.actions;

export default foodsSlice.reducer;