
import axiosInstance from "../api/axiosConfig";
import API from "../api/apiEndPoints";
import { getUserId } from "../utils/jwtUtils";

const userService = {

    // ==========================
    // Get Logged-in User Profile
    // ==========================
    getProfile: async () => {

        const userId = getUserId();

        const response = await axiosInstance.get(API.USER.GET_BY_ID(userId));

        return response.data;
    },


    // ==========================
    // Get User By ID
    // ==========================
    getUserById: async (userId) => {

        const response = await axiosInstance.get(API.USER.GET_BY_ID(userId));

        return response.data;
    },


    // ==========================
    // Update Logged-in User
    // ==========================
    updateProfile: async (user) => {

        const userId = getUserId();

        const response = await axiosInstance.put(
            API.USER.UPDATE(userId),
            user
        );

        return response.data;
    },


    // ==========================
    // ADMIN - Get All Users
    // ==========================
    getAllUsers: async () => {

        const response = await axiosInstance.get(API.USER.ALL);

        return response.data;
    },


    // ==========================
    // ADMIN - Update User
    // ==========================
    updateUser: async (userId, user) => {

        const response = await axiosInstance.put(
            API.USER.UPDATE(userId),
            user
        );

        return response.data;
    },


    // ==========================
    // ADMIN - Delete User
    // ==========================
    deleteUser: async (userId) => {

        const response = await axiosInstance.delete(
            API.USER.DELETE(userId)
        );

        return response.data;
    }

};

export default userService;


