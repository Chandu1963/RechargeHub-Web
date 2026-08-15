import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import historyService from "../../services/historyService";
import Pagination from "../../components/pagination/Pagination";
import { History as HistoryIcon } from "lucide-react";

function RechargeHistory() {


const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

const fetchHistory = async () => {

    try {

        setLoading(true);

        const response = await historyService.getAllHistory();

        setHistory(response || []);

    } catch (error) {

        console.error("Error fetching recharge history:", error);

        toast.error(
            error.response?.data?.message ||
            "Failed to fetch recharge history"
        );

    } finally {

        setLoading(false);
    }
};

useEffect(() => {
    fetchHistory();
}, []);

const handleDelete = async (historyId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this recharge history?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await historyService.deleteHistory(historyId);

        toast.success("Recharge history deleted successfully");

        fetchHistory();

    } catch (error) {

        console.error("Error deleting recharge history:", error);

        toast.error(
            error.response?.data?.message ||
            "Failed to delete recharge history"
        );
    }
};

return (
    <div className="space-y-6 animate-fadeIn">

        <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                <HistoryIcon className="w-6 h-6 text-indigo-600" />
                All Recharge History
            </h2>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : history.length === 0 ? (
            <div className="alert alert-info border-0 shadow-sm py-8 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-3xl text-center">
                No recharge history found.
            </div>
        ) : (
            <div className="card shadow-sm border border-indigo-100 bg-white rounded-3xl overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="bg-indigo-50">
                                <tr>
                                    <th>History ID</th>
                                    <th>Customer</th>
                                    <th>Mobile Number</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                    <th>Recharge Status</th>
                                    <th>Payment Status</th>
                                    <th>Recharge Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (

                                    <tr key={item.historyId}>

                                        <td className="font-mono text-slate-700 font-bold">#{item.historyId}</td>

                                        <td className="font-bold text-slate-900">{item.customerName}</td>

                                        <td className="font-bold text-slate-800">{item.mobileNumber}</td>

                                        <td className="font-semibold text-slate-900">{item.planName}</td>

                                        <td className="font-extrabold text-indigo-600 text-sm">₹{item.rechargeAmount}</td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    item.rechargeStatus === "SUCCESS"
                                                        ? "bg-success"
                                                        : item.rechargeStatus === "FAILED"
                                                        ? "bg-danger"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {item.rechargeStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    item.paymentStatus === "SUCCESS"
                                                        ? "bg-success"
                                                        : item.paymentStatus === "FAILED"
                                                        ? "bg-danger"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {item.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="text-xs font-medium text-slate-600">
                                            {item.rechargeDate
                                                ? new Date(
                                                      item.rechargeDate
                                                  ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDelete(item.historyId)
                                                }
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>

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
