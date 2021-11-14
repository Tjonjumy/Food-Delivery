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
        updateItem(state, action) {
            const existingItemIdx = state.items.findIndex(item => item.itemId === action.payload.itemId);
            state.items.splice(existingItemIdx, 1, action.payload);
        },
        removeItem(state, action) {
            const existingItemIdx = state.items.findIndex(item => item.itemId === action.payload);
            state.items[existingItemIdx].isActive = false;
        },
        activeItem(state, action) {
            const existingItemIdx = state.items.findIndex(item => item.itemId === action.payload);
            state.items[existingItemIdx].isActive = true;
        },
    }
});

export const foodsActions = foodsSlice.actions;

export default foodsSlice.reducer;