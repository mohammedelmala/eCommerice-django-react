import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS
} from "../constants/CartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existsItem = state.cartItems.find((x) => x.product === item.product);
            if (existsItem) {
                return { ...state, cartItems: state.cartItems.map(x => x.product === existsItem.product ? item : x) }
            }
            else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case REMOVE_FROM_CART:
            const product = action.payload;
            return { ...state, cartItems: state.cartItems.filter(item => item.product !== product) }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state, shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case CART_CLEAR_ITEMS:
            return { cartItems: [] };
        default:
            return state;
    }

}