const API = {

    AUTH: {
        REGISTER_CUSTOMER: "/api/auth/register-customer",
        LOGIN: "/api/auth/login",
        VERIFY_OTP: "/api/auth/verify"
    },

    ADMIN: {
        SAVE: "/admins/save",
        UPDATE: (id) => `/admins/update/${id}`,
        DELETE: (id) => `/admins/delete/${id}`,
        GET_BY_ID: (id) => `/admins/${id}`,
        ALL: "/admins/all"
    },

    CUSTOMER: {
        SAVE: "/customers/save",
        UPDATE: (id) => `/customers/update/${id}`,
        DELETE: (id) => `/customers/delete/${id}`,
        GET_BY_ID: (id) => `/customers/${id}`,
        ALL: "/customers/all"
    },

    RECHARGE_PLAN: {
        SAVE: "/rechargeplans/save",
        UPDATE: (id) => `/rechargeplans/update/${id}`,
        DELETE: (id) => `/rechargeplans/delete/${id}`,
        GET_BY_ID: (id) => `/rechargeplans/${id}`,
        ALL: "/rechargeplans/all"
    },

    RECHARGE: {
        SAVE: "/recharges/save",
        GET_BY_ID: (id) => `/recharges/${id}`,
        ALL: "/recharges/all",
        DELETE: (id) => `/recharges/${id}`,
        EXPIRING_SOON: "/recharges/expiring-soon"
    },

    PAYMENT: {
        SAVE: "/payments/save",
        CREATE_ORDER: "/payments/create-order",
        VERIFY: "/payments/verify",
        GET_BY_ID: (id) => `/payments/${id}`,
        ALL: "/payments/all",
        DELETE: (id) => `/payments/${id}`
    },

    RECHARGE_HISTORY: {
        GET_BY_ID: (id) => `/rechargehistory/${id}`,
        GET_BY_CUSTOMER: (id) => `/rechargehistory/customer/${id}`,
        GET_BY_RECHARGE: (id) => `/rechargehistory/recharge/${id}`,
        GET_BY_PAYMENT: (id) => `/rechargehistory/payment/${id}`,
        ALL: "/rechargehistory/all",
        GET_BY_PLAN: (id) => `/rechargehistory/plan/${id}`,
        GET_BY_RECHARGE_STATUS: (status) => `/rechargehistory/recharge-status/${status}`,
        GET_BY_PAYMENT_STATUS: (status) => `/rechargehistory/payment-status/${status}`,
        GET_BETWEEN_DATES: "/rechargehistory/between-dates",
        DELETE: (id) => `/rechargehistory/${id}`
    },

    USER: {
        UPDATE: (id) => `/users/update/${id}`,
        GET_BY_ID: (id) => `/users/${id}`,
        DELETE: (id) => `/users/delete/${id}`,
        ALL: "/users/all"
    }

};

export default API;