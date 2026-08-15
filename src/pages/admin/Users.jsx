import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import Pagination from "../../components/pagination/Pagination";
import { UserCheck } from "lucide-react";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        role: "USER",
        status: "ACTIVE"
    });


    // ==========================
    // Fetch All Users
    // ==========================
    const fetchUsers = async () => {

        try {

            setLoading(true);

            const response =
                await userService.getAllUsers();

            console.log(
                "Users Response:",
                response
            );

            setUsers(response.data || []);

        } catch (error) {

            console.error(
                "Failed to fetch users:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchUsers();

    }, []);


    // ==========================
    // Handle Form Change
    // ==========================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================
    // Edit User
    // ==========================
    const handleEdit = (user) => {

        console.log(
            "Editing User:",
            user
        );

        setEditingId(user.userId);

        setFormData({
            role: user.role || "USER",
            status: user.status || "ACTIVE"
        });

        setShowForm(true);

    };


    // ==========================
    // Cancel Edit
    // ==========================
    const handleCancel = () => {

        setEditingId(null);

        setShowForm(false);

        setFormData({
            role: "USER",
            status: "ACTIVE"
        });

    };


    // ==========================
    // Update User Status
    // ==========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editingId === null) {
            return;
        }

        try {

            console.log(
                "Updating User ID:",
                editingId
            );

            const updateData = {
                status: formData.status
            };

            console.log(
                "Update User Data:",
                updateData
            );

            const response =
                await userService.updateUser(
                    editingId,
                    updateData
                );

            console.log(
                "Update User Response:",
                response
            );

            toast.success(
                response.message ||
                "User status updated successfully"
            );

            handleCancel();

            await fetchUsers();

        } catch (error) {

            console.error(
                "Failed to update user:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update user"
            );

        }

    };


    // ==========================
    // Delete User
    // ==========================
    const handleDelete = async (userId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const response =
                await userService.deleteUser(userId);

            console.log(
                "Delete User Response:",
                response
            );

            toast.success(
                response.message ||
                "User deleted successfully"
            );

            await fetchUsers();

        } catch (error) {

            console.error(
                "Failed to delete user:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };


    // ==========================
    // Loading
    // ==========================
    if (loading) {

        return (

            <div className="flex justify-center items-center min-h-[60vh]">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

            </div>

        );

    }


    return (

        <div className="space-y-6 animate-fadeIn">

            {/* HEADER */}

            <div className="flex justify-between items-center pb-2 border-b border-indigo-100">

                <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-indigo-600" />
                    User Management
                </h2>

                <button
                    type="button"
                    className="btn btn-outline-primary flex items-center gap-2 text-xs"
                    onClick={() =>
                        window.history.back()
                    }
                >
                    <FaArrowLeft />
                    Back
                </button>

            </div>


            {/* EDIT FORM */}

            {showForm && (

                <div className="card shadow-md border border-indigo-100 bg-white rounded-3xl mb-4">

                    <div className="card-body p-6">

                        <div className="flex justify-between items-center mb-4">

                            <h4 className="font-bold text-slate-900 font-heading mb-0">
                                Edit User Status
                            </h4>

                            <button
                                type="button"
                                className="btn btn-outline-secondary text-xs"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                {/* ROLE - READ ONLY */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label font-bold text-slate-700">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control bg-slate-50 font-bold"
                                        value={formData.role}
                                        readOnly
                                    />

                                </div>


                                {/* STATUS - EDITABLE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label font-bold text-slate-700">
                                        Status
                                    </label>

                                    <select
                                        className="form-select font-semibold"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >

                                        <option value="ACTIVE">
                                            ACTIVE
                                        </option>

                                        <option value="INACTIVE">
                                            INACTIVE
                                        </option>

                                        <option value="BLOCKED">
                                            BLOCKED
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                            >
                                Update User
                            </button>

                        </form>

                    </div>

                </div>

            )}


            {/* USERS TABLE */}

            <div className="card shadow-sm border border-indigo-100 bg-white rounded-3xl overflow-hidden">

                <div className="card-body p-0">

                    {users.length === 0 ? (

                        <div className="text-center py-12">

                            <p className="text-muted mb-0 font-medium">
                                No users found.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="bg-indigo-50">

                                    <tr>

                                        <th>ID</th>

                                        <th>Customer Name</th>

                                        <th>Mobile Number</th>

                                        <th>Email</th>

                                        <th>Circle</th>

                                        <th>Role</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user) => (

                                        <tr key={user.userId}>

                                            <td className="font-mono text-slate-700 font-bold">
                                                {user.userId}
                                            </td>


                                            <td className="font-bold text-slate-900">
                                                {user.customer?.customerName || "-"}
                                            </td>


                                            <td className="font-semibold text-slate-800">
                                                {user.customer?.mobileNumber || "-"}
                                            </td>


                                            <td className="font-medium text-slate-600">
                                                {user.customer?.email || "-"}
                                            </td>


                                            <td className="font-medium text-slate-600">
                                                {user.customer?.circle || "-"}
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        user.role === "ADMIN"
                                                            ? "badge bg-danger"
                                                            : "badge bg-primary"
                                                    }
                                                >
                                                    {user.role}
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        user.status === "ACTIVE"
                                                            ? "badge bg-success"
                                                            : user.status === "BLOCKED"
                                                                ? "badge bg-danger"
                                                                : "badge bg-secondary"
                                                    }
                                                >
                                                    {user.status}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="flex gap-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleEdit(user)
                                                        }
                                                        title="Edit User"
                                                    >
                                                        <FaEdit />
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.userId
                                                            )
                                                        }
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

                {/* PAGINATION */}
                <div className="card-footer bg-white border-t border-indigo-100 py-3">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={users.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(newSize) => {
                            setItemsPerPage(newSize);
                            setCurrentPage(1);
                        }}
                    />
                </div>

            </div>

        </div>

    );

}

export default Users;
