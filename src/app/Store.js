import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice'
import ProductReducer from '../features/products/ProductSlice';
import CartReducer from '../features/cart/CartSlice';

//Redux Store
export const store = configureStore({
    reducer:{
        auth:authReducer,
        products: ProductReducer,
        cart: CartReducer
    },
});
