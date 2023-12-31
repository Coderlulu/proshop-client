import axios from "axios";
import queryString from "query-string";
const baseURL = "http://localhost:5000/api";
const axiosClient = axios.create({
    baseURL,
    paramsSerializer: params => queryString.stringify(params),
    withCredentials: true,
});
axios.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
        },
    };
});
axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) return response.data;
        return response;
    },
    err => {
        if (!err.response) {
            return alert(err);
        }
        throw err.response;
    }
);
export default axiosClient;
