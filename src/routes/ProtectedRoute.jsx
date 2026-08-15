
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles = [] }) => {

    const {
        isLoggedIn,
        role,
        loading
    } = useAuth();

    const location = useLocation();

    console.log("PROTECTED ROUTE CHECK:", {
        path: location.pathname,
        isLoggedIn,
        role,
        allowedRoles,
        loading
    });

    // Wait until authentication state is loaded
    if (loading) {
        return null;
    }

    // User is not logged in
    if (!isLoggedIn) {

        console.log(
            "PROTECTED ROUTE: NOT LOGGED IN -> /"
        );

        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is logged in but doesn't have permission
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)
    ) {

        console.log(
            "PROTECTED ROUTE: ROLE MISMATCH -> /",
            {
                currentRole: role,
                allowedRoles
            }
        );

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    // Authentication and role are valid
    console.log(
        "PROTECTED ROUTE: ACCESS GRANTED"
    );

    return <Outlet />;
};

export default ProtectedRoute;

