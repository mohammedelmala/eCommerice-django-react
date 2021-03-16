import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

import { productsReducers, selectedProductReducer } from "./reducers";
import { cartReducer } from "./reducers/CartReducer";

const reducers = combineReducers({
    products: productsReducers,
    selectedProduct: selectedProductReducer,
    cart: cartReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
//const cartItemsFromLocalStorage = []
const defaultState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    }
}

const middleware = [thunk]
const Store = createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(...middleware)));

export default Store;