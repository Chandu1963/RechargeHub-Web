import axios from "axios";
import { getToken, clearAuth } from "../utils/jwtUtils";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://rechargehub-backend-750i.onrender.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = getToken();

        console.log(
            `[API Request to ${config.url}] Token attached:`,
            !!token
        );

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status;

        if (status === 401 || status === 403) {

            console.error(
                `Auth Error (${status}): Clearing authentication.`
            );

            clearAuth();

            sessionStorage.clear();

            if (
                window.location.pathname !==
                "/user-login"
            ) {
                window.location.href =
                    "/user-login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;