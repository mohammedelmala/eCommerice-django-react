import axios from "axios";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET

} from "../constants/UserConstants";


import { ORDER_LIST_MY_RESET } from "../constants/OrdersConstants";


export const userLogin = (email, password) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            'header': {
                'content-type': "application/json"
            }
        }


        const { data } = await axios.post(`/api/users/login`,
            { "username": email, "password": password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        })
    }

    if (getState().userLogin.userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(getState().userLogin.userInfo));
    }
}


export const logout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    });

    dispatch({
        type: ORDER_LIST_MY_RESET
    });

    dispatch({
        type: USER_LIST_RESET
    });
}


export const register = (name, email, password) => async (dispatch) => {

    dispatch({
        type: USER_REGISTER_REQUEST
    });
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post("/api/users/register",
            {
                "name": name,
                "username": email,
                "email": email,
                "password": password
            },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.details ?
                error.response.data.details : error.response
        })

    }


}


export const getDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });
        const { userInfo } = getState().userLogin;
        const config = {
            "headers": {
                "content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`

            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });
    }



}


export const listUsers = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LIST_REQUEST
    });

    try {
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('/api/users/',
            config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });
    }


}