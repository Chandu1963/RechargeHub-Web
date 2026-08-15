const TOKEN_KEY = "jwtToken";
const ROLE_KEY = "userRole";

export const storage = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    setRole(role) {
        localStorage.setItem(ROLE_KEY, role);
    },

    getRole() {
        return localStorage.getItem(ROLE_KEY);
    },

    clear() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    }
};