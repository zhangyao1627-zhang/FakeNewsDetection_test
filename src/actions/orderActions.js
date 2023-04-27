import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from "../constants/orderConstants";

import {
    CART_CLEAR_ITEMS
} from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

    //    注意 中途 还是需要 user 送 token的应用
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(config)

        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        // 删除掉这个cartItems: 就是localStorage里面的后 还要对redux里面的进行处理

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch(error) {

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}