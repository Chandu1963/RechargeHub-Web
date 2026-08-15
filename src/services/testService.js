import axiosInstance from "../api/axiosConfig";

export const testBackend = async () => {
    try {
        const response = await axiosInstance.get("/");
        console.log(response.data);
    } catch (error) {
        console.log("Backend Connection:", error.message);
    }
};