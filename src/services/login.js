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
                throw new Error(error.response.data.msg || 'Error desconocido');
            } else if (error.request) {
                throw new Error('No hay respuesta del servidor');
            } else {
                throw new Error('Error al configurar la petición');
            }
        }
    };
}

export const login = async (credentials) => {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockResponse.data);
            }, 1000);
        });
    } else {
        try {
            const response = await axios.post(`${URL_BASE}/auth/login`, credentials);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.msg || 'Error desconocido');
            } else if (error.request) {
                throw new Error('No hay respuesta del servidor');
            } else {
                throw new Error('Error al configurar la petición');
            }
        }
    }
};

export const logout = async (token) => {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    } else {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`${URL_BASE}/auth/logout`, null, config);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.msg || 'Error desconocido');
            } else if (error.request) {
                throw new Error('No hay respuesta del servidor');
            } else {
                throw new Error('Error al configurar la petición');
            }
        }
    }
};