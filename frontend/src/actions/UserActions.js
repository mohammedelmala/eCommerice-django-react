import axios from "axios";

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/UserConstants";


export const userLogin = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            'header': {
                'content-type': "application/json"
            }
        }
        const { data } = await axios.get(`/api/user/login/`,
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

    localStorage.setItem("userInfo", JSON.stringify(data))
}