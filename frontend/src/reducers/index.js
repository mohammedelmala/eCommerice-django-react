import { PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_SUCCESS, PRODUCTS_FETCH_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/ProductConstants";

export const productsReducers = (state = { products: [] }, action) => {
    console.log(action.type);

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
    console.log(action.type);

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