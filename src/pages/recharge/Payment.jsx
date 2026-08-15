import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import paymentService from "../../services/paymentService";
import { CreditCard, ArrowLeft, AlertTriangle, Lock, ShieldCheck } from "lucide-react";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRazorpayGateway = async () => {
    try {
      // 1. Create order on backend
      const orderRes = await paymentService.createRazorpayOrder({
        rechargeId: Number(id),
      });

      const orderData = orderRes.data || orderRes;

      // 2. Options for Razorpay Checkout Modal
      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID",
        amount: orderData.amount, // amount in paise
        currency: orderData.currency || "INR",
        name: "Recharge Hub",
        description: "Mobile Recharge Payment",
        order_id: orderData.orderId || orderData.razorpayOrderId,
        handler: async function (response) {
          try {
            setLoading(true);
            // 3. Verify payment signature on backend
            const verifyRes = await paymentService.verifyRazorpayPayment({
              rechargeId: Number(id),
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: "RAZORPAY",
            });

            toast.success("Payment Verified & Successful!");
            navigate("/user/payment-success", {
              state: verifyRes.data || verifyRes,
            });
          } catch (verifyError) {
            console.error("Verification failed:", verifyError);
            const msg = verifyError?.response?.data?.message || "Payment verification failed.";
            toast.error(msg);
            setErrorMessage(msg);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "Customer",
          email: localStorage.getItem("userEmail") || "customer@rechargehub.com",
          contact: localStorage.getItem("userMobile") || "9876543210",
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Payment cancelled by user.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (orderError) {
      console.warn("Razorpay Order API failed, falling back to direct payment:", orderError);
      // Fallback to direct payment if backend order endpoint is not yet connected
      await handleDirectPayment();
    }
  };

  const handleDirectPayment = async () => {
    try {
      const response = await paymentService.makePayment({
        rechargeId: Number(id),
        paymentMethod,
      });

      toast.success("Payment Successful!");
      navigate("/user/payment-success", {
        state: response.data || response,
      });
    } catch (error) {
      console.error(error);
      const status = error?.response?.status;
      const msg = status === 409
        ? "This recharge has already been paid. Please create a new recharge to make another payment."
        : (error?.response?.data?.message || "Payment failed. Please try again.");

      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage("");

    if (paymentMethod === "RAZORPAY") {
      await handleRazorpayGateway();
    } else {
      await handleDirectPayment();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-indigo-100 bg-white shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto shadow-sm">
            <CreditCard className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Secure Checkout</h2>
          <p className="text-xs text-slate-500 font-medium">Powered by official Razorpay Payment Gateway</p>
        </div>

        <div className="space-y-5">
          
          {/* Razorpay Gateway Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 tracking-wide uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Encrypted Payment
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-700 rounded-full">
                INSTANT
              </span>
            </div>

            <div className="text-xs text-slate-600 font-medium leading-relaxed">
              Inside Razorpay popup, you can pay using any of your preferred methods:
            </div>

            {/* Supported Payment Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold text-slate-700">
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>UPI (GPay / Paytm)</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Cards (Debit / Credit)</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Net Banking</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Digital Wallets</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={loading}
            onClick={handlePayment}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Opening Razorpay Gateway...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Proceed to Pay via Razorpay</span>
              </>
            )}
          </button>

          <button
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5"
            onClick={() => navigate("/user/plans")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recharge Plans
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payment;