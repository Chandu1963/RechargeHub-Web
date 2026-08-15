import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";
import { 
  KeyRound, 
  AlertCircle, 
  Edit2, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

function VerifyOtp() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const storedMobile = sessionStorage.getItem("mobileNumber");

    if (!storedMobile) {
      navigate("/user-login");
      return;
    }

    setMobileNumber(storedMobile);
  }, [navigate]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const cleanOtp = otp.trim();
    const cleanMobile = mobileNumber.trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.verifyOtp(cleanMobile, cleanOtp);

      console.log("OTP Verification Response:", response);

      if (response.success) {
        const token = response.data.token;
        const role = response.data.role;

        login(token, role);

        const extractedCustomerId = response.data.customerId;
        if (extractedCustomerId !== null && extractedCustomerId !== undefined) {
          localStorage.setItem(
            "rechargehub_customerId",
            String(extractedCustomerId)
          );
        }

        try {
          const payload = JSON.parse(
            atob(
              token
                .split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/")
            )
          );

          const extractedUserId = payload.userId || payload.id;
          if (extractedUserId) {
            localStorage.setItem("userId", extractedUserId);
            localStorage.setItem("rechargehub_userId", extractedUserId);
          }
        } catch (decodeError) {
          console.error("Failed to decode JWT:", decodeError);
        }

        sessionStorage.removeItem("mobileNumber");
        sessionStorage.removeItem("loginType");

        if (role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        setError(response.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(
        err.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setError("");
    setLoading(true);
    try {
      const loginType = sessionStorage.getItem("loginType") || "USER";
      const response = await authService.login(mobileNumber, loginType);
      if (response.success) {
        toast.success("A new 6-digit OTP has been sent to your mobile number.");
        setResendTimer(30);
        setCanResend(false);
      } else {
        setError(response.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-xl border border-indigo-100 bg-white relative">
        
        {/* Top Icon & Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-7 h-7 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            Verify Security OTP
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            We sent a 6-digit verification code to
          </p>

          {/* Mobile Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-slate-900 font-bold font-mono text-sm mt-3">
            <span>+91 {mobileNumber}</span>
            <button
              type="button"
              onClick={() => navigate("/user-login", { state: { mobileNumber } })}
              className="p-1 rounded-lg hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 transition-colors"
              title="Change Mobile Number"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
              Enter 6-Digit Verification Code
            </label>
            <input
              type="text"
              className="w-full py-4 text-center glass-input rounded-2xl text-2xl font-extrabold tracking-[0.4em] font-mono text-indigo-600 placeholder-slate-300 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              autoFocus
            />
          </div>

          {/* Error alert */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn font-semibold">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Security Code...</span>
              </>
            ) : (
              <>
                <span>Verify OTP & Sign In</span>
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Resend Timer & Actions */}
        <div className="mt-8 pt-6 border-t border-indigo-100 text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
            >
              Didn't receive the code? Resend OTP Now
            </button>
          ) : (
            <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Resend OTP available in </span>
              <span className="font-mono text-indigo-600 font-bold">{resendTimer}s</span>
            </div>
          )}
        </div>

      </div>
    </AuthLayout>
  );
}

export default VerifyOtp;
