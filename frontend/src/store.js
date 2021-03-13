import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

import { productsReducers, selectedProductReducer } from "./reducers";

const reducers = combineReducers({
    products: productsReducers,
    selectedProduct: selectedProductReducer
});

const defaultState = {

}

const middleware = [thunk]
const Store = createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(...middleware)));

export default Store;