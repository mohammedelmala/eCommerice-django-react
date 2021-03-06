import axios from "axios";

import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_FAIL,
    PRODUCTS_FETCH_SUCCESS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from "../constants/ProductConstants";

export const fetchProducts = (keyword = '') => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCTS_FETCH_REQUEST
        });
        // const { data } = await Axios.get(`api/products${keyword}`);
        const { data } = await axios.get(`/api/products${keyword}`)
        dispatch({
            type: PRODUCTS_FETCH_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCTS_FETCH_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}


export const fetchProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });
        const { data } = await axios.get(`/api/products/${id}/`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        })
    }

}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/products/delete/${id}`,
            config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });

    }
}


export const createProduct = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/api/products/create");

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });

    }
}


export const updateProduct = (product) => async (dispatch, getState) => {
    console.log(product);
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/update/${product._id}/`,
            product,
            config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });
    }
}


export const createProductReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_REVIEW_CREATE_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products/review/${id}/`,
            review,
            config);

        dispatch({
            type: PRODUCT_REVIEW_CREATE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response.statusText
        })

    }
}

export const listTopProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST
        });

        const { data } = await axios.get('/api/products/top/');

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.response
        });

    }
}