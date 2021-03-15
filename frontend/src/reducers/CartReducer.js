import { ADD_TO_CART } from "../constants/CartConstants";

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
        default:
            return state;
    }

}