import { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosConfig";
import Pagination from "../../components/pagination/Pagination";
import { Clock } from "lucide-react";

function ExpiringRecharges() {

const [recharges, setRecharges] = useState([]);
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

const fetchExpiringRecharges = async () => {

    try {

        setLoading(true);

        const response = await axiosInstance.get(
            "/recharges/expiring-soon"
        );

        setRecharges(response.data.data || []);

    } catch (error) {

        console.error(
            "Error fetching expiring recharges:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Failed to fetch expiring recharges"
        );

    } finally {

        setLoading(false);
    }
};

useEffect(() => {
    fetchExpiringRecharges();
}, []);

return (
    <div className="space-y-6 animate-fadeIn">

        <div className="flex justify-between items-center pb-2 border-b border-indigo-100">

            <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                Expiring Recharges
            </h2>

            <button
                className="btn btn-primary text-xs font-bold"
                onClick={fetchExpiringRecharges}
                disabled={loading}
            >
                <FaSyncAlt className="me-2" />
                Refresh
            </button>

        </div>

        {loading ? (

            <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>

        ) : recharges.length === 0 ? (

            <div className="alert alert-success border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-3xl p-6 text-center font-semibold">
                No recharges are expiring within the next 3 days.
            </div>

        ) : (

            <div className="card shadow-sm border border-indigo-100 bg-white rounded-3xl overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="bg-indigo-50">

                                <tr>
                                    <th>Recharge ID</th>
                                    <th>Customer Name</th>
                                    <th>Mobile Number</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                    <th>Expiry Date</th>
                                    <th>Days Remaining</th>
                                </tr>

                            </thead>

                            <tbody>

                                {recharges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((recharge) => (

                                    <tr key={recharge.rechargeId}>

                                        <td className="font-mono text-slate-700 font-bold">#{recharge.rechargeId}</td>

                                        <td className="font-bold text-slate-900">{recharge.customerName}</td>

                                        <td className="font-bold text-slate-800">{recharge.mobileNumber}</td>

                                        <td className="font-semibold text-slate-900">{recharge.planName}</td>

                                        <td className="font-extrabold text-indigo-600 text-sm">
                                            ₹{recharge.rechargeAmount}
                                        </td>

                                        <td className="text-xs font-medium text-slate-600">
                                            {recharge.expiryDate
                                                ? new Date(
                                                      recharge.expiryDate
                                                  ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    recharge.daysRemaining === 0
                                                        ? "bg-danger"
                                                        : recharge.daysRemaining === 1
                                                        ? "bg-warning text-dark"
                                                        : "bg-primary"
                                                }`}
                                            >
                                                {recharge.daysRemaining === 0
                                                    ? "Expires Today"
                                                    : `${recharge.daysRemaining} Day(s)`}
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
                        totalItems={recharges.length}
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

export default ExpiringRecharges;
