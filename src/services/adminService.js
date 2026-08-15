import api from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const adminService = {
  getExpiringRecharges: async () => {
    const response = await api.get(API.RECHARGE.EXPIRING_SOON);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get(API.USER.ALL);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(API.USER.DELETE(id));
    return response.data;
  },

  getAllAdmins: async () => {
    const response = await api.get(API.ADMIN.ALL);
    return response.data;
  },

  getAdminById: async (id) => {
    const response = await api.get(API.ADMIN.GET_BY_ID(id));
    return response.data;
  },

  registerAdmin: async (adminData) => {
    const response = await api.post(API.ADMIN.SAVE, adminData);
    return response.data;
  },

  updateAdmin: async (id, adminData) => {
    const response = await api.put(API.ADMIN.UPDATE(id), adminData);
    return response.data;
  },

  deleteAdmin: async (id) => {
    const response = await api.delete(API.ADMIN.DELETE(id));
    return response.data;
  }
};

export default adminService;

