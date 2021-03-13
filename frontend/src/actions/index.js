import Axios from "../utilities/Axios";
import axios from "axios";
import { PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_FAIL, PRODUCTS_FETCH_SUCCESS } from "../constants/ProductConstants";

export const fetchProducts = () => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCTS_FETCH_REQUEST
        });
        // const { data } = await Axios.get("api/products/");
        const { data } = await axios.get("api/products/")
        dispatch({
            type: PRODUCTS_FETCH_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCTS_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}