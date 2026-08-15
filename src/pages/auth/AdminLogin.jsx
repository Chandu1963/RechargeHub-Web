import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout";
import { getToken, getRole } from "../../utils/jwtUtils";
import { 
  ShieldAlert, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  Lock 
} from "lucide-react";

function AdminLogin() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token && (role === "ROLE_ADMIN" || role === "ADMIN")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(mobileNumber, "ADMIN");

      if (response.success) {
        sessionStorage.setItem("mobileNumber", mobileNumber);
        sessionStorage.setItem("loginType", "ADMIN");

        navigate("/verify-otp");
      } else {
        setError(response.message || "Admin authorization failed.");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(
        err.response?.data?.message || "Failed to send OTP for Admin Portal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-xl border border-indigo-100 bg-white relative">
        
        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-indigo-50/60 border border-indigo-100 mb-8">
          <Link
            to="/user-login"
            className="py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-indigo-600" />
            User Login
          </Link>
          <button
            type="button"
            className="py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-700 to-slate-900 shadow-md shadow-indigo-700/30 flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            Admin Login
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            Admin Portal Access
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Restricted portal for MobiComm Service Pvt Ltd administrators
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Registered Admin Mobile
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                🇮🇳 +91
              </div>
              <input
                type="text"
                className="w-full pl-20 pr-10 py-3.5 rounded-2xl glass-input text-lg font-bold tracking-wider text-slate-900 placeholder-slate-400 transition-all border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Enter admin number"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                maxLength={10}
                autoFocus
              />
              {mobileNumber.length === 10 && !error && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-900 hover:from-indigo-800 hover:to-slate-950 text-white font-bold text-base shadow-xl shadow-indigo-700/30 hover:shadow-indigo-700/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Authorization...</span>
              </>
            ) : (
              <>
                <span>Request Admin OTP</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-indigo-100 text-center">
          <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            Unauthorized access attempts are audited and logged
          </p>
        </div>

      </div>
    </AuthLayout>
  );
}

export default AdminLogin;