import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
    productDetail: null,
    status: 'idel',
    error: null,
    filters: {},
    lastFetches:null,
    detailStatus: 'idel',
    detailError: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) =>{
            state.status = 'loading';
            state.error = null;
        },
        fetchProductsSuccess: (state,action) => {
            state.products = action.payload.products;
            state.status = 'successed';
            state.lastFetches = Date.now() 
        },
        fetchProductsFailure: (state,action) => {
            state.status = 'failed';
            state.error = action.payload
        },
        // Product Detail Action
        fetchProductDetailSuccess:(state,action) =>{
            state.productDetail = action.payload.product;
            state.detailStatus = 'Succeeded'
        },
        fetchProductDetailFailure: (state,action) => {
            state.detailStatus = 'failed';
            state.detailError = action.payload
        },
        clearProductDetail: (state) => {
            state.productDetail = null;
            state.detailStatus = 'idle';
            state.detailError = null;
        },
        // common action
        setFilters: (state,action) => {
            state.filters = action.payload
        },
        resetProducts: () => initialState,
    }
})

export const selectProducts = (state) => state.products;

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductDetailSuccess,
    fetchProductDetailFailure,
    clearProductDetail,
    setFilters,
    resetProducts
} = productSlice.actions
export default productSlice.reducer