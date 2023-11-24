// services/login.js
import axios from 'axios';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

const mockResponse = {
    data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzdWFyaW8gRXhlbXBsbyIsInJvbGUiOiJjb2xhYm9yYWRvciIsImlhdCI6MTUxNjIzOTAyMn0.DsOa4KlWbJx4k0NTP0Z2Kc-H6-w8LR4NdW69CqKsMko",
        role: "administrador"
    }
};

export const login = (credentials) => {
    console.log('URL_BASE:', URL_BASE);
    console.log('USE_MOCK:', USE_MOCK);
    if (USE_MOCK) {
        // Retornar una promesa que simula una llamada al servidor
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockResponse.data);
            }, 1000);
        });
    } else {
        // Realizar la llamada al backend
        return axios.post(`${URL_BASE}/auth/login`, credentials)
            .then(response => response.data);
    }
};