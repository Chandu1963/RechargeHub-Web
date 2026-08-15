import { createContext, useEffect, useState } from "react";

import {
saveToken,
saveRole,
getToken,
getRole,
clearAuth
} from "../utils/jwtUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const [token, setToken] = useState(null);

const [role, setRole] = useState(null);

const [isLoggedIn, setIsLoggedIn] = useState(false);

const [loading, setLoading] = useState(true);

useEffect(() => {

    const storedToken = getToken();
    const storedRole = getRole();

    if (storedToken) {

        setToken(storedToken);
        setRole(storedRole);
        setIsLoggedIn(true);

    }

    setLoading(false);

}, []);

const login = (jwtToken, userRole) => {

    saveToken(jwtToken);
    saveRole(userRole);

    setToken(jwtToken);
    setRole(userRole);
    setIsLoggedIn(true);

};

const logout = () => {

    clearAuth();

    setToken(null);
    setRole(null);
    setIsLoggedIn(false);

};

return (

    <AuthContext.Provider
        value={{
            token,
            role,
            isLoggedIn,
            loading,
            login,
            logout
        }}
    >

        {children}

    </AuthContext.Provider>

);

};
