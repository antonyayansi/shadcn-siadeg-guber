import axios from "axios";

const baseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        token: localStorage.getItem('x0-token') || '',
        periodo: localStorage.getItem('x0-periodo') || new Date().getFullYear().toString(),
    }
});

//interceptor
baseApi.interceptors.response.use(
    async response => {
        if (response.data[0]?.idd == '*') {
            localStorage.removeItem('x0-jwt');
            localStorage.removeItem('x0-token');
            localStorage.removeItem('x0-periodo');
            localStorage.removeItem('x0-empresa');
            localStorage.removeItem('x0-menus')
            localStorage.removeItem('x0-modulos')
            localStorage.removeItem('x0-raw-menus')
            window.location.href = '/login'
        }
        return response
    }
)


export default baseApi;