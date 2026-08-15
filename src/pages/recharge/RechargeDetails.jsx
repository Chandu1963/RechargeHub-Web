import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rechargeService from "../../services/rechargeService";
import { Smartphone, ArrowLeft, ShieldCheck, Calendar, User, CreditCard, Printer, CheckCircle2, Clock, LayoutDashboard } from "lucide-react";

function RechargeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recharge, setRecharge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRecharge();
    }, []);

    const loadRecharge = async () => {
        try {
            setLoading(true);
            const response = await rechargeService.getRechargeById(id);
            setRecharge(response.data || response);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Failed to load recharge details."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-500 tracking-wide uppercase">Fetching Transaction Record...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-lg mx-auto my-12 px-4">
                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
                    <h4 className="font-bold text-base font-heading">Unable to Load Details</h4>
                    <p className="text-xs font-medium text-amber-700">{error}</p>
                    <button
                        className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-sm hover:bg-amber-700 transition-colors"
                        onClick={() => navigate("/user/history")}
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    if (!recharge) return null;

    const isSuccess = recharge.rechargeStatus === "SUCCESS";
    const startDate = recharge.rechargeDate ? new Date(recharge.rechargeDate) : null;
    const endDate = recharge.expiryDate ? new Date(recharge.expiryDate) : null;

    return (
        <div className="max-w-3xl mx-auto my-6 px-4 animate-fadeIn space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <button
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all shadow-2xs"
                        onClick={() => navigate("/user/dashboard")}
                    >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        Go to Dashboard
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
                        onClick={() => window.print()}
                    >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        Print Tax Invoice
                    </button>
                </div>
            </div>

            {/* Main Digital Receipt Card */}
            <div className="card glass-panel border border-indigo-100 bg-white shadow-xl overflow-hidden rounded-3xl space-y-0">
                
                {/* Header Banner */}
                <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider">Mobile Recharge Tax Receipt</div>
                            <h3 className="text-xl font-bold font-heading text-white mb-0">Recharge #{recharge.rechargeId}</h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                            isSuccess
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                        }`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {recharge.rechargeStatus || "COMPLETED"}
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    
                    {/* Key Info Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Line & Customer Info */}
                        <div className="p-5 rounded-2xl border border-indigo-100 bg-slate-50/60 space-y-3">
                            <div className="text-xs font-extrabold text-indigo-600 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                                <User className="w-3.5 h-3.5" />
                                Subscriber Information
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Customer Name</span>
                                    <span className="font-bold text-slate-900">{recharge.customerName || "N/A"}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Mobile Number</span>
                                    <span className="font-bold font-mono text-indigo-600">{recharge.mobileNumber || "N/A"}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Service Type</span>
                                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-800 text-[10px]">
                                        {recharge.rechargeType || "PREPAID"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Plan & Validity Info */}
                        <div className="p-5 rounded-2xl border border-indigo-100 bg-slate-50/60 space-y-3">
                            <div className="text-xs font-extrabold text-indigo-600 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                                <CreditCard className="w-3.5 h-3.5" />
                                Package & Validity
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Plan Package</span>
                                    <span className="font-bold text-slate-900">{recharge.planName || "Standard Pack"}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Total Paid</span>
                                    <span className="font-extrabold text-indigo-600 text-sm">₹ {recharge.rechargeAmount || 0}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Plan Validity</span>
                                    <span className="font-bold text-slate-900">{recharge.planValidity || "N/A"} Days</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Timeline Breakdown */}
                    <div className="p-5 rounded-2xl border border-indigo-100 bg-white space-y-3 shadow-2xs">
                        <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                            Validity Period Timeline
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                                <div className="text-slate-500 text-[11px] font-medium mb-1">Recharged On</div>
                                <div className="font-bold text-slate-900">
                                    {startDate ? startDate.toLocaleString() : "N/A"}
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                                <div className="text-indigo-600 text-[11px] font-bold mb-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Expiring On
                                </div>
                                <div className="font-extrabold text-indigo-900">
                                    {endDate ? endDate.toLocaleString() : "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default RechargeDetails;