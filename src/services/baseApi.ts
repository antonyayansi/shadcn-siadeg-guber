import axios from "axios";

const baseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        token: localStorage.getItem('x0-token') || '',
    }
});

export default baseApi;