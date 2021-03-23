import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET
} from "../constants/OrdersConstants";

import { CART_CLEAR_ITEMS } from "../constants/CartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST
    })

    try {
        const { userLogin } = getState();
        console.log(userLogin);
        const { userInfo } = userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/orders/add/',
            order,
            config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: CART_CLEAR_ITEMS
        });
        localStorage.removeItem("cartItems");
    }
    catch (error) {
        console.log("Dispatch fail");
        console.log(error);
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });
    }


}

export const resetOrder = () => (dispatch) => {
    dispatch({
        type: ORDER_CREATE_RESET
    })
};