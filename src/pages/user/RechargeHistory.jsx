import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import historyService from "../../services/historyService";
import Pagination from "../../components/pagination/Pagination";
import { History, ArrowLeft } from "lucide-react";

function RechargeHistory() {
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

const navigate = useNavigate();

useEffect(() => {
    fetchHistory();
}, []);

const fetchHistory = async () => {
    const customerId =
        localStorage.getItem("rechargehub_customerId");

    console.log(
        "Customer ID from Local Storage:",
        customerId
    );

    if (!customerId) {
        console.error(
            "rechargehub_customerId is missing from Local Storage"
        );

        toast.error(
            "Customer information not found. Please login again."
        );

        setLoading(false);
        return;
    }

    try {
        setLoading(true);

        const response =
            await historyService.getCustomerHistory(
                customerId
            );

        console.log(
            "Recharge History Response:",
            response
        );

        setHistory(response || []);

    } catch (error) {
        console.error(
            "Error loading recharge history:",
            error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to load recharge history."
        );
    } finally {
        setLoading(false);
    }
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case "SUCCESS":
            return "bg-success";

        case "FAILED":
            return "bg-danger";

        case "PENDING":
            return "bg-warning text-dark";

        default:
            return "bg-secondary";
    }
};

return (
    <div className="space-y-6 animate-fadeIn">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <History className="w-6 h-6 text-indigo-600" />
                    My Recharge History
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">View past prepaid mobile recharge transactions & receipts</p>
            </div>

            <button
                className="btn btn-outline-primary"
                onClick={() =>
                    navigate("/user/dashboard")
                }
            >
                <ArrowLeft className="w-4 h-4 me-1.5" />
                Back to Dashboard
            </button>

        </div>

        {loading ? (

            <div className="text-center py-16">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

            </div>

        ) : history.length === 0 ? (

            <div className="alert alert-info text-center border-0 shadow-sm py-8 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-3xl">

                <h5 className="mb-2 font-bold text-slate-900">
                    No recharges yet!
                </h5>

                <p className="mb-0 text-slate-600 font-medium text-xs">
                    Your past transactions will appear here.
                </p>

            </div>

        ) : (

            <div className="card shadow-sm border border-indigo-100 bg-white rounded-3xl overflow-hidden">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="bg-indigo-50">

                                <tr>
                                    <th>Date</th>
                                    <th>Mobile Number</th>
                                    <th>Plan Name</th>
                                    <th>Amount</th>
                                    <th>Recharge Status</th>
                                    <th>Payment Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                {history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((record) => (

                                    <tr
                                        key={
                                            record.historyId ??
                                            record.rechargeId
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/user/recharge/${record.rechargeId}`
                                            )
                                        }
                                    >

                                        <td className="font-medium text-slate-700">
                                            {record.rechargeDate
                                                ? new Date(
                                                    record.rechargeDate
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="font-bold text-slate-900">
                                            {record.mobileNumber}
                                        </td>

                                        <td>
                                            <strong className="text-slate-900 font-bold">
                                                {record.planName}
                                            </strong>
                                        </td>

                                        <td className="font-extrabold text-indigo-600">
                                            ₹ {record.rechargeAmount}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${getStatusBadgeClass(
                                                    record.rechargeStatus
                                                )}`}
                                            >
                                                {record.rechargeStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${getStatusBadgeClass(
                                                    record.paymentStatus
                                                )}`}
                                            >
                                                {record.paymentStatus}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* PAGINATION */}
                <div className="card-footer bg-white border-t border-indigo-100 py-3">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={history.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(newSize) => {
                            setItemsPerPage(newSize);
                            setCurrentPage(1);
                        }}
                    />
                </div>

            </div>

        )}

    </div>
);

}

export default RechargeHistory;
