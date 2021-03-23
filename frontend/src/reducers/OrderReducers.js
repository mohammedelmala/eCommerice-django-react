import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET
} from "../constants/OrdersConstants";


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            console.log("Order Fail");
            console.log(action.payload);
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state;
    }


}