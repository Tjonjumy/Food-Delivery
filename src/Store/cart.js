import { createSlice } from "@reduxjs/toolkit";

const cartSclie = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        cartId: null,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.itemId === newItem.itemId);
            state.totalQuantity ++;
            if (existingItem) {
                existingItem.amount ? existingItem.amount ++ : existingItem.quantity ++;              
                existingItem.totalPrice += newItem.price;
            } else {
                state.items.push({
                    itemId: newItem.itemId,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.itemId === id);
            existingItem.amount ? state.totalQuantity -= existingItem.amount :
            state.totalQuantity -= existingItem.quantity;
            const existingItemIdx = state.items.findIndex(item => item.itemId === id);
            state.items.splice(existingItemIdx, 1);
        },
        createCart(state, action) {
            state.cartId = action.payload;
        },
        setCartData(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },

        resetCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.cartId = null;
        }
    }
});

export const cartActions = cartSclie.actions;

export default cartSclie.reducer;