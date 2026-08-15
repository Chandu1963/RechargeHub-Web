import api from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const createRecharge = async (rechargeRequest) => {
    const response = await api.post(API.RECHARGE.SAVE, rechargeRequest);
    return response.data;
};

const getRechargeById = async (id) => {
    const response = await api.get(API.RECHARGE.GET_BY_ID(id));
    return response.data;
};

const getAllRecharges = async () => {
    const response = await api.get(API.RECHARGE.ALL);
    return response.data;
};

const getExpiringRecharges = async () => {
    const response = await api.get(API.RECHARGE.EXPIRING_SOON);
    return response.data;
};

const deleteRecharge = async (id) => {
    const response = await api.delete(API.RECHARGE.DELETE(id));
    return response.data;
};

const rechargeService = {
    createRecharge,
    getRechargeById,
    getAllRecharges,
    getExpiringRecharges,
    deleteRecharge
};

export default rechargeService;