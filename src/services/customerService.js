import api from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const customerService = {
  getAllCustomers: async () => {
    const response = await api.get(API.CUSTOMER.ALL);
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(API.CUSTOMER.GET_BY_ID(id));
    return response.data;
  },

  createCustomer: async (customerData) => {
    const response = await api.post(API.CUSTOMER.SAVE, customerData);
    return response.data;
  },

  updateCustomer: async (id, customerData) => {
    const response = await api.put(API.CUSTOMER.UPDATE(id), customerData);
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await api.delete(API.CUSTOMER.DELETE(id));
    return response.data;
  }
};

export default customerService;

