import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { verifyToken } from "../services/login";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState('Usuario');
    const [foto, setFoto] = useState(`${process.env.PUBLIC_URL}/img/profile.svg`);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = async (token, role, username) => {
        Cookies.set('token', token, { expires: 1, secure: false, sameSite: 'Lax' });
        Cookies.set('role', role, { expires: 1, secure: false, sameSite: 'Lax' });
        Cookies.set('username', username, { expires: 1, secure: false, sameSite: 'Lax' });
        setToken(token);
        setRole(role);
        setUsername(username);
        console.log("Datos: ", token, role, username);
        console.log("(AuthContext) Datos de usuario guardados en cookies y contexto.");
    }

    const handleLogout = async () => {
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('username');
        setToken(null);
        setRole(null);
        setUsername(null);
        setName(null);
        setFoto(null);
        console.log("(AuthContext) Datos de usuario eliminados de cookies y contexto.");
    };

    // Función para validar el token y establecer el estado
    const validateAndSetToken = async () => {
        setIsLoading(true);
        const currentToken = Cookies.get("token");
        if (currentToken) {
            console.log('(AuthContext) Token actual:', currentToken);
            try {
                const response = await verifyToken(currentToken);
                if (response.msg === 'Token is valid') {
                    console.log('(AuthContext) Token válido');
                    setToken(currentToken);
                    setRole(Cookies.get("role"));
                    setUsername(Cookies.get("username"));
                } else throw new Error('Invalid token');
            } catch (error) {
                console.error('(AuthContext) Error durante la validación del token:', error);
                Cookies.remove("token");
                Cookies.remove("role");
                Cookies.remove("username");
                setToken(null);
                setRole(null);
                setUsername(null);
                setName(null);
                setFoto(null);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        validateAndSetToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, role, setRole, username, setUsername, name, setName, foto, setFoto, isLoading, setIsLoading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};