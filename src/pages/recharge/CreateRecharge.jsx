import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rechargeService from "../../services/rechargeService";
import { ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

function CreateRecharge() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const selectedPlan = location.state?.selectedPlan;

  useEffect(() => {
    if (!selectedPlan) {
      toast.error("Please select a plan first.");
      navigate("/user/plans");
    }
  }, [selectedPlan, navigate]);

  const handleConfirmRecharge = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User session not found.");
      return;
    }

    const requestPayload = {
      userId: Number(userId),
      planId: selectedPlan.planId,
      rechargeType: "PREPAID",
    };

    try {
      setLoading(true);

      const response = await rechargeService.createRecharge(requestPayload);
      const newRecharge = response.data;

      toast.success("Recharge initiated! Proceeding to payment...");
      navigate(`/user/payment/${newRecharge.rechargeId}`);
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || "Failed to create recharge";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-indigo-100 bg-white shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-heading">Confirm Recharge Plan</h3>
          <p className="text-xs text-slate-500 font-medium">Review your selected package before proceeding</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30 space-y-3.5 text-sm font-medium">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <span className="text-slate-500">Plan Name</span>
            <span className="font-bold text-slate-900">{selectedPlan.planName}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <span className="text-slate-500">Total Price</span>
            <span className="font-extrabold text-indigo-600 text-lg">₹{selectedPlan.price}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <span className="text-slate-500">Validity</span>
            <span className="font-bold text-slate-900">{selectedPlan.validityDays} Days</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <span className="text-slate-500">Data Benefits</span>
            <span className="font-bold text-indigo-600">{selectedPlan.dataBenefits}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Connection Type</span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold">
              PREPAID
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            onClick={handleConfirmRecharge}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Initiating Order...</span>
              </>
            ) : (
              <>
                <span>Confirm & Proceed to Payment</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <button
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5"
            onClick={() => navigate("/user/plans")}
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Change Plan
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreateRecharge;