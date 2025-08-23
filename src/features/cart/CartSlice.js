import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add item to cart
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            }
            state.totalQuantity += 1;
            state.totalPrice += newItem.price;
        },
        
        // Remove item from cart
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity -= 1;
                    existingItem.totalPrice = existingItem.price * existingItem.quantity;
                }
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            }
        },
        
        // Remove all quantities of an item from cart
        removeItemCompletely: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        
        // Clear entire cart
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        
        // Update item quantity (set specific quantity)
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem && quantity > 0) {
                const quantityDifference = quantity - existingItem.quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * existingItem.price;
                
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;
            }
        }
    }
});

export const { 
    addToCart, 
    removeItem, 
    removeItemCompletely, 
    clearCart, 
    updateItemQuantity 
} = cartSlice.actions;
export default cartSlice.reducer;