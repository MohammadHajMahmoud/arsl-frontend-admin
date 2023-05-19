import axios from "axios";

export const persistenceApi = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
});