import axios from "axios";

export const persistenceApi = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});
persistenceApi.defaults.withCredentials = true;
persistenceApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;