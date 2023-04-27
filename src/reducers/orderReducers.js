import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        // 研究下 loading: true or false 是如何影响最终的结果的
        case ORDER_CREATE_FAIL:
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