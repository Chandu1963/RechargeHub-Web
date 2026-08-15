const TOKEN_KEY = "rechargehub_token";
const ROLE_KEY = "rechargehub_role";

// =========================
// Token
// =========================

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// =========================
// Role
// =========================

export const saveRole = (role) => {
    localStorage.setItem(ROLE_KEY, role);
};

export const getRole = () => {
    return localStorage.getItem(ROLE_KEY);
};

export const removeRole = () => {
    localStorage.removeItem(ROLE_KEY);
};

// =========================
// Authentication
// =========================

export const isAuthenticated = () => {
    return !!getToken();
};

export const clearAuth = () => {
    removeToken();
    removeRole();
};

// =========================
// JWT Helpers
// =========================

const parseJwt = (token) => {

    if (!token) return null;

    try {

        const base64Payload = token.split(".")[1];

        const jsonPayload = atob(
            base64Payload.replace(/-/g, "+").replace(/_/g, "/")
        );

        return JSON.parse(jsonPayload);

    } catch (error) {

        console.error("Invalid JWT:", error);

        return null;

    }

};

export const getCurrentUser = () => {

    const token = getToken();

    return parseJwt(token);

};

export const getUserId = () => {

    const payload = getCurrentUser();

    return payload?.userId || null;

};

export const getMobileNumber = () => {

    const payload = getCurrentUser();

    return payload?.sub || null;

};

export const getUserRole = () => {

    const payload = getCurrentUser();

    return payload?.role || getRole();

};