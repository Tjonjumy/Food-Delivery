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
                existingItem.quantity ++;
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
            const id = action.payload.id;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            } else {
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        createCart(state, action) {
            console.log(action.payload)
            state.cartId = action.payload;
        },
        setCartData(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        }
    }
});

export const cartActions = cartSclie.actions;

export default cartSclie.reducer;