import axiosInstance from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const paymentService = {

    createRazorpayOrder: async (orderData) => {
        const response = await axiosInstance.post(
            API.PAYMENT.CREATE_ORDER,
            orderData
        );
        return response.data;
    },

    verifyRazorpayPayment: async (verificationData) => {
        const response = await axiosInstance.post(
            API.PAYMENT.VERIFY,
            verificationData
        );
        return response.data;
    },

    makePayment: async (paymentData) => {

        const response = await axiosInstance.post(
            API.PAYMENT.SAVE,
            paymentData
        );

        return response.data;
    },

    getPaymentById: async (paymentId) => {

        const response = await axiosInstance.get(
            API.PAYMENT.GET_BY_ID(paymentId)
        );

        return response.data;
    },

    getAllPayments: async () => {

        const response = await axiosInstance.get(
            API.PAYMENT.ALL
        );

        return response.data;
    },

    deletePayment: async (paymentId) => {

        const response = await axiosInstance.delete(
            API.PAYMENT.DELETE(paymentId)
        );

        return response.data;
    }

};

export default paymentService;