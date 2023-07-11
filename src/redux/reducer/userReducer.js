import {
    AUTH_USER_FAIL,
    AUTH_USER_LOGOUT,
    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    USER_DETAILS_START,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_DETAILS_START,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_FAIL,
} from "../constants/userConstants.js";
export const authReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case AUTH_USER_START:
            return {
                loading: true,
            };
        case AUTH_USER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case AUTH_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case AUTH_USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
export const userDetailsReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_START:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const userUpdateDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_DETAILS_START:
            return { loading: true };
        case USER_UPDATE_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_UPDATE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
