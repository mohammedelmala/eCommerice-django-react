import axios from "axios";

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/UserConstants";


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
            payload: error.response && error.response.data.details ?
                error.response.data.details : error.response
        })
    }

    localStorage.setItem("userInfo", JSON.stringify(getState().userLogin.userInfo))
}