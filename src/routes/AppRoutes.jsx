import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import CustomerRegistration from "../pages/auth/CustomerRegistration";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/home/Home";

import UserLogin from "../pages/auth/UserLogin";
import AdminLogin from "../pages/auth/AdminLogin";
import VerifyOtp from "../pages/auth/VerifyOtp";

import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import RechargeHistory from "../pages/user/RechargeHistory";

import RechargePlans from "../pages/recharge/RechargePlans";
import CreateRecharge from "../pages/recharge/CreateRecharge";
import RechargeDetails from "../pages/recharge/RechargeDetails";
import Payment from "../pages/recharge/Payment";
import PaymentSuccess from "../pages/recharge/PaymentSuccess";

import AdminDashboard from "../pages/admin/Dashboard";
import Customers from "../pages/admin/Customers";
import Users from "../pages/admin/Users";
import AdminRechargePlans from "../pages/admin/RechargePlans";
import AdminRechargeHistory from "../pages/admin/RechargeHistory";
import ExpiringRecharges from "../pages/admin/ExpiringRecharges";

import NotFound from "../pages/error/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/customer-registration" element={<CustomerRegistration />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* PROTECTED USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/history" element={<RechargeHistory />} />
          <Route path="/user/plans" element={<RechargePlans />} />
        </Route>

        <Route path="/user/recharge/create" element={<CreateRecharge />} />
        <Route path="/user/recharge/:id" element={<RechargeDetails />} />
        <Route path="/user/payment/:id" element={<Payment />} />
        <Route path="/user/payment-success" element={<PaymentSuccess />} />
      </Route>

      {/* PROTECTED ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/plans" element={<AdminRechargePlans />} />
          <Route path="/admin/history" element={<AdminRechargeHistory />} />
          <Route path="/admin/expiring" element={<ExpiringRecharges />} />
        </Route>
      </Route>

      {/* 404 NOT FOUND */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
