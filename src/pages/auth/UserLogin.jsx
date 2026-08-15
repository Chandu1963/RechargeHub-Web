import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout";
import { getToken, getRole } from "../../utils/jwtUtils";
import { 
  Smartphone, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  ShieldAlert, 
  UserCheck,
  Lock
} from "lucide-react";

function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileNumber, setMobileNumber] = useState(
    location.state?.mobileNumber || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token && (role === "ROLE_USER" || role === "USER")) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setShowRegistration(false);

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(mobileNumber, "USER");

      console.log("User Login Response:", response);

      if (response.success) {
        sessionStorage.setItem("mobileNumber", mobileNumber);
        sessionStorage.setItem("loginType", "USER");

        toast.success(response.message || "OTP sent successfully to registered email.");

        navigate("/verify-otp");
        return;
      }

      if (
        response.message &&
        response.message.toLowerCase().includes("customer not registered")
      ) {
        setError("Customer not registered with RechargeHub.");
        setShowRegistration(true);
        return;
      }

      setError(
        response.message || "Unable to process login. Please try again."
      );
    } catch (err) {
      console.error("User Login Error:", err);

      const backendMessage = err.response?.data?.message;

      if (
        backendMessage &&
        backendMessage.toLowerCase().includes("customer not registered")
      ) {
        setError("Customer not registered with RechargeHub.");
        setShowRegistration(true);
        return;
      }

      setError(
        backendMessage || "Unable to process login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = () => {
    navigate("/customer-registration", {
      state: {
        mobileNumber: mobileNumber
      }
    });
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNumber(value);
    setError("");
    setShowRegistration(false);
  };

  return (
    <AuthLayout>
      <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-xl border border-indigo-100 bg-white relative">
        
        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-indigo-50/60 border border-indigo-100 mb-8">
          <button
            type="button"
            className="py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-white" />
            User Login
          </button>
          <Link
            to="/admin-login"
            className="py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            Admin Login
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Enter your mobile number to receive your 6-digit OTP
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                🇮🇳 +91
              </div>
              <input
                type="text"
                className="w-full pl-20 pr-10 py-3.5 rounded-2xl glass-input text-lg font-bold tracking-wider text-slate-900 placeholder-slate-400 transition-all border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Enter 10-digit number"
                value={mobileNumber}
                onChange={handleMobileChange}
                maxLength={10}
                autoFocus
              />
              {mobileNumber.length === 10 && !error && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600">
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
                {showRegistration && (
                  <p className="mt-1 text-slate-600 font-medium">
                    Register a new customer account to start using RechargeHub services.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Registration Prompt */}
          {showRegistration && (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-3 animate-fadeIn">
              <p className="text-xs text-slate-700 font-semibold">
                Don't have an active RechargeHub account?
              </p>
              <button
                type="button"
                onClick={handleRegistration}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Register Account Now
              </button>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <span>Send OTP to Continue</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-indigo-100 text-center">
          <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            OTP verification keeps your account 100% secure
          </p>
        </div>

      </div>
    </AuthLayout>
  );
}

export default UserLogin;
