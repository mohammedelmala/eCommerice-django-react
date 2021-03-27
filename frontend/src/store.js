import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

import { productsReducers, selectedProductReducer } from "./reducers";
import { cartReducer } from "./reducers/CartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userListReducer } from "./reducers/UserReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from "./reducers/OrderReducers";

const reducers = combineReducers({
    products: productsReducers,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    createOrder: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const getUserInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const getShippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : null

const getPaymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null


console.log("User Info from local storage");
console.log(getUserInfoFromStorage);

const defaultState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: getShippingAddressFromStorage,
        paymentMethod: getPaymentMethodFromStorage
    },
    userLogin: { userInfo: getUserInfoFromStorage }
}

const middleware = [thunk]
const Store = createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(...middleware)));

export default Store;