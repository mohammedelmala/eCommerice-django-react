import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

import { productsReducers, selectedProductReducer } from "./reducers";
import { cartReducer } from "./reducers/CartReducer";
import { userLoginReducer } from "./reducers/UserReducers";
const reducers = combineReducers({
    products: productsReducers,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const getUserInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

console.log(getUserInfoFromStorage);
const defaultState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        userInfo: getUserInfoFromStorage
    }
}

const middleware = [thunk]
const Store = createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(...middleware)));

export default Store;