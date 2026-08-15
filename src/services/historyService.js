import axiosInstance from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const historyService = {

// Get All Recharge History - ADMIN
getAllHistory: async () => {

    const response = await axiosInstance.get(
        API.RECHARGE_HISTORY.ALL
    );

    return response.data.data;
},

// Get Recharge History By Customer ID
getCustomerHistory: async (customerId) => {

    const response = await axiosInstance.get(
        API.RECHARGE_HISTORY.GET_BY_CUSTOMER(customerId)
    );

    return response.data.data;
},

// Get Recharge History By History ID
getHistoryById: async (historyId) => {

    const response = await axiosInstance.get(
        API.RECHARGE_HISTORY.GET_BY_ID(historyId)
    );

    return response.data.data;
},

// Delete Recharge History - ADMIN
deleteHistory: async (historyId) => {

    const response = await axiosInstance.delete(
        API.RECHARGE_HISTORY.DELETE(historyId)
    );

    return response.data;
}


};

export default historyService;

