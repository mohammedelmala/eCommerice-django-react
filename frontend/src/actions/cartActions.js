import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/CartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}/`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: id,
            name: data.name,
            image: data.image,
            qty: qty,
            price: data.price,
            countInStock: data.countInStock
        }
    });


    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}