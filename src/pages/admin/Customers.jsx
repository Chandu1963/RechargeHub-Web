import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/axiosConfig";
import Pagination from "../../components/pagination/Pagination";
import { Users as UsersIcon } from "lucide-react";

function Customers() {

const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

const [showForm, setShowForm] = useState(false);
const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    email: "",
    circle: "",
    status: "ACTIVE"
});

const fetchCustomers = async () => {

    try {

        setLoading(true);

        const response =
            await api.get("/customers/all");

        console.log(
            "Customers Response:",
            response.data
        );

        setCustomers(response.data.data || []);

    } catch (error) {

        console.error(
            "Failed to fetch customers:",
            error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to load customers"
        );

    } finally {

        setLoading(false);

    }
};

useEffect(() => {

    fetchCustomers();

}, []);

const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

};

const handleAdd = () => {

    setEditingId(null);

    setFormData({
        customerName: "",
        mobileNumber: "",
        email: "",
        circle: "",
        status: "ACTIVE"
    });

    setShowForm(true);

};

const handleEdit = (customer) => {

    console.log(
        "Editing Customer:",
        customer
    );

    setEditingId(customer.customerId);

    setFormData({
        customerName: customer.customerName || "",
        mobileNumber: customer.mobileNumber || "",
        email: customer.email || "",
        circle: customer.circle || "",
        status: customer.status || "ACTIVE"
    });

    setShowForm(true);

};

const handleCancel = () => {

    setEditingId(null);
    setShowForm(false);

    setFormData({
        customerName: "",
        mobileNumber: "",
        email: "",
        circle: "",
        status: "ACTIVE"
    });

};

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (editingId !== null) {

            console.log(
                "Updating Customer ID:",
                editingId
            );

            const response =
                await api.put(
                    `/customers/update/${editingId}`,
                    formData
                );

            console.log(
                "Update Customer Response:",
                response.data
            );

            toast.success(
                "Customer updated successfully"
            );

        } else {

            const response =
                await api.post(
                    "/customers/save",
                    formData
                );

            console.log(
                "Create Customer Response:",
                response.data
            );

            toast.success(
                "Customer created successfully"
            );

        }

        handleCancel();

        await fetchCustomers();

    } catch (error) {

        console.error(
            "Failed to save customer:",
            error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to save customer"
        );

    }

};

const handleDelete = async (customerId) => {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this customer?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await api.delete(
                `/customers/delete/${customerId}`
            );

        console.log(
            "Delete Customer Response:",
            response.data
        );

        toast.success(
            response.data.message ||
            "Customer deleted successfully"
        );

        await fetchCustomers();

    } catch (error) {

        console.error(
            "Failed to delete customer:",
            error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to delete customer"
        );

    }

};

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
                <UsersIcon className="w-6 h-6 text-indigo-600" />
                Customer Management
            </h2>

            <button
                type="button"
                className="btn btn-primary flex items-center gap-2 text-xs font-bold"
                onClick={handleAdd}
            >
                <FaPlus />
                Add Customer
            </button>

        </div>


        {/* FORM */}

        {showForm && (

            <div className="card shadow-md border border-indigo-100 bg-white rounded-3xl mb-4">

                <div className="card-body p-6">

                    <div className="flex justify-between items-center mb-4">

                        <h4 className="font-bold text-slate-900 font-heading mb-0">
                            {editingId !== null
                                ? "Edit Customer Details"
                                : "Add New Customer"}
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

                            <div className="col-md-6 mb-3">

                                <label className="form-label font-bold text-slate-700">
                                    Customer Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control font-semibold"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label font-bold text-slate-700">
                                    Mobile Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control font-bold tracking-wider"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    pattern="[6-9][0-9]{9}"
                                    required
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label font-bold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="form-control font-semibold"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label font-bold text-slate-700">
                                    Circle / State
                                </label>

                                <input
                                    type="text"
                                    className="form-control font-semibold"
                                    name="circle"
                                    value={formData.circle}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


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

                                </select>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                        >
                            {editingId !== null
                                ? "Update Customer"
                                : "Create Customer"}
                        </button>

                    </form>

                </div>

            </div>

        )}


        {/* CUSTOMER TABLE */}

        <div className="card shadow-sm border border-indigo-100 bg-white rounded-3xl overflow-hidden">

            <div className="card-body p-0">

                <div className="flex justify-between items-center p-4 border-b border-indigo-100">

                    <h4 className="mb-0 font-bold text-slate-900 text-base font-heading">
                        All Customers
                    </h4>

                    <button
                        type="button"
                        className="btn btn-outline-secondary flex items-center gap-2 text-xs"
                        onClick={() =>
                            window.history.back()
                        }
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                </div>


                {customers.length === 0 ? (

                    <div className="text-center py-12">

                        <p className="text-muted mb-0 font-medium">
                            No customers found.
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
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {customers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((customer) => (

                                    <tr key={customer.customerId}>

                                        <td className="font-mono text-slate-700 font-bold">
                                            {customer.customerId}
                                        </td>

                                        <td className="font-bold text-slate-900">
                                            {customer.customerName}
                                        </td>

                                        <td className="font-bold text-slate-800">
                                            {customer.mobileNumber}
                                        </td>

                                        <td className="font-medium text-slate-600">
                                            {customer.email}
                                        </td>

                                        <td className="font-medium text-slate-600">
                                            {customer.circle}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    customer.status === "ACTIVE"
                                                        ? "badge bg-success"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {customer.status}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="flex gap-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() =>
                                                        handleEdit(customer)
                                                    }
                                                    title="Edit Customer"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        handleDelete(
                                                            customer.customerId
                                                        )
                                                    }
                                                    title="Delete Customer"
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
                    totalItems={customers.length}
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

export default Customers;
