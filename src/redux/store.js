import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducer/cartReducer.js";
import {
    authReducer,
    userDetailsReducer,
    userUpdateDetailsReducer,
} from "./reducer/userReducer.js";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducer/productReducer.js";
import {
    orderCreateReducer,
    orderDetailsReducer,
    myOrderListReducer,
    orderListReducer,
} from "./reducer/orderReducer.js";
const reducer = combineReducers({
    // user
    auth: authReducer,
    userDetails: userDetailsReducer,
    userUpdateDetails: userUpdateDetailsReducer,
    // product
    productList: productListReducer,
    productDetails: productDetailsReducer,
    // cart
    cart: cartReducer,
    // order
    orderCreate: orderCreateReducer,
    // orderDetail: orderDetailsReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
const paymengMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : {};

const initialState = {
    auth: {
        userInfo: userInfoFromStorage,
    },
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymengMethodFromStorage,
    },
};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
