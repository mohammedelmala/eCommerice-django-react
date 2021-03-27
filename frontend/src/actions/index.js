import axios from "axios";

import { PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_FAIL, PRODUCTS_FETCH_SUCCESS } from "../constants/ProductConstants";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/ProductConstants";

export const fetchProducts = () => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCTS_FETCH_REQUEST
        });
        // const { data } = await Axios.get("api/products/");
        const { data } = await axios.get("/api/products/")
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