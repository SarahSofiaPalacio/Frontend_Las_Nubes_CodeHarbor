import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { validateToken } from "./services/login";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    // Función para validar el token y establecer el estado
    const validateAndSetToken = async () => {
        const currentToken = Cookies.get("token");
        if (currentToken) {
            const isValid = await validateToken(currentToken);
            console.log("Is token valid: ", isValid);
            if (isValid) {
                setToken(currentToken);
                setRole(Cookies.get("role"));
                setUsername(Cookies.get("username"));
            } else {
                Cookies.remove("token");
                Cookies.remove("role");
                Cookies.remove("username");
                setToken(null);
                setRole(null);
                setUsername(null);
            }
        }
    };

    useEffect(() => {
        validateAndSetToken();
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUsername, role, setRole, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
