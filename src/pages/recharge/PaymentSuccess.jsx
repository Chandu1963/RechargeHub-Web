import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, RefreshCw, Receipt, ShieldCheck, Copy, Printer } from "lucide-react";
import { toast } from "react-toastify";

function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    // Safely extract the payment data
    const stateData = location.state;
    const payment = stateData?.data || stateData;

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    if (!payment) {
        return (
            <div className="max-w-lg mx-auto my-12 px-4 text-center">
                <div className="glass-panel p-8 rounded-3xl border border-indigo-100 bg-white shadow-xl space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                        <Receipt className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">Payment Info Not Found</h3>
                    <p className="text-xs text-slate-500 font-medium">Please initiate a payment from your recharge plans page.</p>
                    <button
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20"
                        onClick={() => navigate("/user/plans")}
                    >
                        Explore Recharge Plans
                    </button>
                </div>
            </div>
        );
    }

    const rechargeId = payment.rechargeId || payment.recharge?.rechargeId;

    return (
        <div className="max-w-xl mx-auto my-8 px-4 animate-fadeIn">
            <div className="card glass-panel border border-indigo-100 bg-white shadow-2xl overflow-hidden rounded-3xl">
                
                {/* Header Success Celebration */}
                <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 text-white p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                        <CheckCircle2 className="w-9 h-9 text-emerald-300" />
                    </div>

                    <h2 className="text-2xl font-extrabold font-heading text-white mb-1">
                        Payment Successful! 🎉
                    </h2>
                    <p className="text-xs text-indigo-100 font-medium max-w-sm mx-auto">
                        Your transaction has been verified and processed by the telecom operator.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-extrabold text-xl">
                        <span>₹ {payment.amount || 0}</span>
                    </div>
                </div>

                <div className="card-body p-6 space-y-6">
                    
                    {/* Status Alert Banner */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Operator Activation Confirmed
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-800 text-[10px] uppercase font-extrabold">
                            {payment.paymentStatus || "SUCCESS"}
                        </span>
                    </div>

                    {/* Receipt Details Table */}
                    <div className="rounded-2xl border border-indigo-100 bg-slate-50/50 p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-indigo-100/70">
                            <span className="text-slate-500 font-semibold">Payment ID</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono text-slate-900 font-bold">{payment.paymentId || "N/A"}</span>
                                <button
                                    onClick={() => copyToClipboard(String(payment.paymentId), "Payment ID")}
                                    className="p-1 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                                    title="Copy Payment ID"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pb-2 border-b border-indigo-100/70">
                            <span className="text-slate-500 font-semibold">Recharge Order ID</span>
                            <span className="font-mono text-slate-900 font-bold">#{rechargeId || "N/A"}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs pb-2 border-b border-indigo-100/70">
                            <span className="text-slate-500 font-semibold">Payment Method</span>
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 text-[11px]">
                                {payment.paymentMethod || "RAZORPAY"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold">Transaction Reference</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono text-slate-800 font-semibold text-[11px] truncate max-w-[160px]">
                                    {payment.transactionId || "N/A"}
                                </span>
                                {payment.transactionId && (
                                    <button
                                        onClick={() => copyToClipboard(payment.transactionId, "Transaction ID")}
                                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                                        title="Copy Transaction ID"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="space-y-3 pt-2">
                        <button
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={!rechargeId}
                            onClick={() => navigate(`/user/recharge/${rechargeId}`)}
                        >
                            <span>View Full Recharge Details</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                className="py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                                onClick={() => window.print()}
                            >
                                <Printer className="w-4 h-4 text-slate-500" />
                                Print Receipt
                            </button>

                            <button
                                className="py-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                                onClick={() => navigate("/user/plans")}
                            >
                                <RefreshCw className="w-4 h-4 text-indigo-600" />
                                Recharge Again
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;