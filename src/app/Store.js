import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice'
import ProductReducer from '../features/products/ProductSlice';


//Redux Store
export const store = configureStore({
    reducer:{
        auth:authReducer,
        products: ProductReducer,
    },
});
