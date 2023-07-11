import {
    CART_ADD_ITEM,
    CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants.js";
import axiosClient from "../../utils/axiosClient.js";
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    const data = await axiosClient.get(`/product/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image[0].url,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
export const removeFromCartAction = id => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
export const cartClearAction = () => async dispatch => {
    dispatch({
        type: CART_CLEAR_ITEMS,
    });
    localStorage.removeItem("cartItems");
};
export const saveShippingAddressAction = data => dispatch => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAction = data => dispatch => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
};
