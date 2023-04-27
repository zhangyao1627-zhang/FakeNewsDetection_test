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
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {

    // 登录的大致想法就是往 localStorage 里面存相对应的值

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            'api/users/login/',{'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const logout = () => async (dispatch) => {

    localStorage.removeItem('userInfo')

    dispatch({type: USER_LOGOUT})
    // 这个部分主要是处理 之前保留下来的user信息
    dispatch({type: USER_DETAILS_RESET})
}

export const register = (name, email, password) => async (dispatch) => {

    // 登录的大致想法就是往 localStorage 里面存相对应的值

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            'api/users/register/',{'name':name, 'email': email, 'password': password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // 注册完成 后 进行相对应的登录操作
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        // GetState 可以 理解为 UseSelector
        // 是为了 进行传递: 这个中间有个token的认证
        const {userLogin:{userInfo}} = getState()

        console.log("User Details in the page")
        console.log(userInfo)

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // 注意 get 和 post 区别 : get 是获取对应的数据
        const {data} = await axios.get(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

        // 主要是对数据进行储存
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        // GetState 可以 理解为 UseSelector
        // 是为了 进行传递: 这个中间有个token的认证
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // 注意 get 和 post 区别 : get 是获取对应的数据
        const {data} = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        // 重新进行登录 操作
        dispatch({
            type: USER_LOGIN_SUCCESS
        })



    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}