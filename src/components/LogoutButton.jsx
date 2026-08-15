import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LogoutButton() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <button
            className="btn btn-danger"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}

export default LogoutButton;