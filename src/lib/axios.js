import axios from "axios";
import {env} from "@/config/env.js";
import {tokenStorage} from "@/utils/tokenStorage.jsx";


const apiClient =axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});
apiClient.interceptors.request.use(
    (config) => {
        const token =tokenStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            tokenStorage.clearTokens();
            if(window.location.pathname !== '/login'){
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default apiClient;