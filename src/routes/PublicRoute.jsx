import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {

    const { isLoggedIn, role } = useAuth();

    if (!isLoggedIn) {
        return <Outlet />;
    }

    if (role === "ROLE_ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;

};

export default PublicRoute;