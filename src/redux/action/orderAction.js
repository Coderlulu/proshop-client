import axiosClient from "../../utils/axiosClient.js";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_REQUEST,
} from "../constants/orderConstants.js";
export const createOrderAction = order => async dispatch => {
    try {
        console.log(order);
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });
        const res = await axiosClient.post("/order", order);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: res });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message,
        });
    }
};
export const getMyOrdersAction = () => async dispatch => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });
        const data = await axiosClient.get("/order/myorders");
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.message,
        });
    }
};
