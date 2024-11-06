import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const name = localStorage.getItem("name");
const api = axios.create({
    baseURL: 'http://localhost:3004/api',
});


const requestArray = [];

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Redirect to login if token is missing
        window.location.href = '/login';
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    if (response.status === 200) {
        if (response.data.success === false) {
            toast.error(response.data.message)
        }
        if (response.data.success === true) {
            return response;
        }

    }



}, function (error) {
    const originalRequest = error.config;
    requestArray.push(originalRequest);

    console.log(error)
    // if (error.response.status === 400) {   //bad request Error
    //     // window.location.href = "/Error";
    //     toast.error(response.data.message)

    // }
    // else if (error.response.status === 500) { // Internal server Error
    //     window.location.href = "/SerError";

    // }
    // else if (error.response.status === 404) {
    //     localStorage.removeItem("name")
    //     localStorage.removeItem("token")
    //     window.location.href = "/login";

    // }
    // else {
    //     return Promise.reject(error);
    // }

});

export default api;