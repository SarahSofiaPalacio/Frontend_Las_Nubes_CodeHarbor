// services/login.js
import axios from 'axios';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const login = (credentials) => {
    if (USE_MOCK) {
        // Retornar una promesa que simula una llamada al servidor
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("token");
            }, 1000);
        });
    } else {
        // Realizar la llamada al backend
        return axios.post(`${URL_BASE}/auth/login`, credentials)
            .then(response => response.data);
    }
};