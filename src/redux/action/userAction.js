import axiosClient from "../../utils/axiosClient.js";
import {
    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    AUTH_USER_LOGOUT,
    AUTH_USER_FAIL,
    USER_DETAILS_START,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_DETAILS_START,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_FAIL,
} from "../constants/userConstants.js";
export const authAction = (inputs, pointName) => async dispatch => {
    try {
        dispatch({ type: AUTH_USER_START });
        const res = await axiosClient.post(`/user/${pointName}`, inputs);
        console.log(res?.user);
        delete res?.user?.password;
        dispatch({ type: AUTH_USER_SUCCESS, payload: res?.user });

        localStorage.setItem("userInfo", JSON.stringify(res?.user));
    } catch (error) {
        dispatch({
            type: AUTH_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const authLogoutAction = () => async dispatch => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    dispatch({ type: AUTH_USER_LOGOUT });
};
export const userDetailsAction = () => async dispatch => {
    try {
        dispatch({ type: USER_DETAILS_START });
        const res = await axiosClient.get("/user/profile");
        dispatch({ type: USER_DETAILS_SUCCESS, payload: res?.user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const userUpdateDetailsAction = inputs => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_DETAILS_START });
        const res = await axiosClient.put("/user/profile", inputs);
        dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: res?.user });
        dispatch({ type: AUTH_USER_SUCCESS, payload: res?.user });
        localStorage.setItem("userInfo", JSON.stringify(res?.user));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
