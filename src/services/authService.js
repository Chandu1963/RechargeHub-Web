import axiosInstance from "../api/axiosConfig";

const authService = {

// =========================
// USER LOGIN
// =========================

login: async (mobileNumber, loginType) => {
    const response = await axiosInstance.post(
        "/api/auth/login",
        {
            mobileNumber,
            loginType
        }
    );

    return response.data;
},

// =========================
// CUSTOMER REGISTRATION
// =========================

registerCustomer: async (customerData) => {
    const response = await axiosInstance.post(
        "/api/auth/register-customer",
        customerData
    );

    return response.data;
},

// =========================
// VERIFY OTP
// =========================

verifyOtp: async (mobileNumber, otp) => {
    const response = await axiosInstance.post(
        "/api/auth/verify",
        {
            mobileNumber,
            otp
        }
    );

    return response.data;
},

// =========================
// GET USER BY ID
// =========================

getUserById: async (userId) => {
    const response = await axiosInstance.get(
        `/users/${userId}`
    );

    return response.data;
},

// =========================
// UPDATE USER
// =========================

updateUser: async (userId, userData) => {
    const response = await axiosInstance.put(
        `/users/update/${userId}`,
        userData
    );

    return response.data;
}

};

export default authService;
