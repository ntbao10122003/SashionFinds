// import axios from "axios";
// const userData = JSON.parse(localStorage.getItem("users") || '{}');
// const token = userData.accessToken;
// console.log(token);

// export const instance = axios.create({
//     baseURL: `https://vpmsd5-8080.csb.app/api`,
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })
import axios from "axios";

// Create an Axios instance with the base URL
const instance = axios.create({
    baseURL: `https://vpmsd5-8080.csb.app/api`,
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Get the user token from local storage
        const userData = JSON.parse(localStorage.getItem("users") || '{}');
        const token = userData.accessToken;

        // Set the authorization header with the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
