import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,


    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
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


export const getOrderDetails = (id) => async (dispatch, getState) => {

    dispatch({
        type: ORDER_DETAILS_REQUEST
    });

    const { userInfo } = getState().userLogin;

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}/`,
            config
        );

        console.log(data);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });
    }




}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST
    });
    const { userInfo } = getState().userLogin;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    try {
        const { data } = axios.put(`/api/orders/${id}/pay/`,
            paymentResult,
            config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        })
    }
}


export const deliverOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DELIVER_REQUEST
    });
    const { userInfo } = getState().userLogin;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    try {
        const { data } = axios.put(`/api/orders/${order._id}/deliver/`,
            {},
            config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        })
    }
}

export const resetPay = () => (dispatch) => {
    dispatch({
        type: ORDER_PAY_RESET
    })

}


export const listMyOrders = () => async (dispatch, getState) => {
    dispatch({
        type: ORDER_LIST_MY_REQUEST
    });

    try {
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders/`,
            config);

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });

    }






}


export const listOrders = () => async (dispatch, getState) => {
    console.log("List Orders");

    try {

        dispatch({
            type: ORDER_LIST_REQUEST
        });

        const userLogin = getState().userLogin;
        const { userInfo } = userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get("/api/orders/",
            config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });



    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response : error.response.data.detail
        });
    }
}


