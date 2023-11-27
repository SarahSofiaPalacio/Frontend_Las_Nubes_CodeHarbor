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

export const verifyToken = async (token) => {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    } else {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`${URL_BASE}/auth/verify-token`, config);
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return { msg: 'No response from server', status: error.request.status };
            } else {
                return { msg: 'Error setting up request', status: 500 };
            }
        }
    };
}

export const login = (credentials) => {
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

export const logout = () => {
    if (USE_MOCK) {
        // Retornar una promesa que simula una llamada al servidor
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    } else {
        // Realizar la llamada al backend
        return axios.post(`${URL_BASE}/auth/logout`);
    }
}