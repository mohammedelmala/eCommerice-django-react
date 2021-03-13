import { PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_SUCCESS, PRODUCTS_FETCH_FAIL } from "../constants/ProductConstants";

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