import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(Cookies.get("username"));
    const [role, setRole] = useState(Cookies.get("role"));
    const [token, setToken] = useState(Cookies.get("token"));

    useEffect(() => {
        setUsername(Cookies.get("username"));
        setRole(Cookies.get("role"));
        setToken(Cookies.get("token"));
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUsername, role, setRole, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
