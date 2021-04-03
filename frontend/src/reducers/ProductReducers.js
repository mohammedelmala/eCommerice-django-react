import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
} from "../constants/ProductConstants";

export const productsReducers = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST:
            return { loading: true, state: { ...state } };
        case PRODUCTS_FETCH_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCTS_FETCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const selectedProductReducer = (state = { products: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, state: { ...state } };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true
            };
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            };
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                error: action.payload
            };
        case PRODUCT_CREATE_RESET:
            return {
            };
        default:
            return state;
    }
}