import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {

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
        default:
            return state;
    }

}