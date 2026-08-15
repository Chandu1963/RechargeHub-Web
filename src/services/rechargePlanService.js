
import api from "../api/axiosConfig";
import API from "../api/apiEndPoints";

const getPlans = () => {
    // Get all recharge plans
    return api.get(API.RECHARGE_PLAN.ALL);
};

const getPlanById = (id) => {
    // Get recharge plan by ID
    return api.get(API.RECHARGE_PLAN.GET_BY_ID(id));
};

const createPlan = (plan) => {
    // Admin: Create recharge plan
    return api.post(API.RECHARGE_PLAN.SAVE, plan);
};

const updatePlan = (id, plan) => {
    // Admin: Update recharge plan
    return api.put(API.RECHARGE_PLAN.UPDATE(id), plan);
};

const deletePlan = (id) => {
    // Admin: Delete recharge plan
    return api.delete(API.RECHARGE_PLAN.DELETE(id));
};

const rechargePlanService = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};

export default rechargePlanService;


