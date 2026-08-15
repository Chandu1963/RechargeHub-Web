import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout";
import { 
  UserPlus, 
  User, 
  Smartphone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

function CustomerRegistration() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMobile = location.state?.mobileNumber || "";

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [email, setEmail] = useState("");
  const [circle, setCircle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!circle) {
      setError("Please select your telecom circle.");
      return;
    }

    try {
      setLoading(true);

      const customerData = {
        customerName: customerName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
        circle: circle
      };

      const response = await authService.registerCustomer(customerData);

      console.log("Customer Registration Response:", response);

      if (response.success) {
        toast.success(
          response.message || "Customer registered successfully."
        );

        navigate("/user-login", {
          replace: true,
          state: {
            mobileNumber: mobileNumber
          }
        });
      } else {
        setError(
          response.message || "Customer registration failed."
        );
      }
    } catch (err) {
      console.error("Customer registration error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to register customer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-xl border border-indigo-100 bg-white relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            New Customer Registration
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Register your RechargeHub connection to start recharging
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-semibold text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-bold tracking-wider text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="10-digit number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-semibold text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Circle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Telecom Circle / State
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                className="w-full pl-10 pr-8 py-3 rounded-xl glass-input text-sm font-semibold text-slate-900 appearance-none bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                value={circle}
                onChange={(e) => setCircle(e.target.value)}
              >
                <option value="" className="text-slate-400">Select Telecom Circle</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>

          {/* Error alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fadeIn font-semibold">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registering Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/user-login")}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to User Login
          </button>

        </form>

      </div>
    </AuthLayout>
  );
}

export default CustomerRegistration;
