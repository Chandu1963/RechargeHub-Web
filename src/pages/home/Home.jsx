import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  Gift, 
  Clock, 
  UserPlus
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileNumber, setMobileNumber] = useState(
    location.state?.mobileNumber || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [activePlanTab, setActivePlanTab] = useState("unlimited");

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

        toast.success(response.message || "OTP sent successfully.");

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

  // Sample Plans Data
  const samplePlans = {
    unlimited: [
      { id: 1, price: 299, validity: "28 Days", data: "1.5 GB / Day", calls: "Truly Unlimited", badge: "Best Seller", desc: "Includes Unlimited 5G Data + 100 SMS/day" },
      { id: 2, price: 719, validity: "84 Days", data: "2.0 GB / Day", calls: "Truly Unlimited", badge: "Value Pack", desc: "Free Disney+ Hotstar Mobile 3 Months" },
      { id: 3, price: 2999, validity: "365 Days", data: "2.5 GB / Day", calls: "Truly Unlimited", badge: "Annual Pack", desc: "Unlimited 5G + Prime Video Mobile Edition" },
    ],
    data: [
      { id: 4, price: 49, validity: "Existing Pack", data: "6 GB Total", calls: "Data Only", badge: "Data Booster", desc: "High Speed 4G/5G Add-on Data" },
      { id: 5, price: 121, validity: "Existing Pack", data: "12 GB Total", calls: "Data Only", badge: "Popular", desc: "Emergency Work-from-Home Data Pack" },
      { id: 6, price: 301, validity: "30 Days", data: "50 GB Total", calls: "Data Only", badge: "Heavy User", desc: "No daily data cap limitation" },
    ],
    topup: [
      { id: 7, price: 10, validity: "Unlimited", talktime: "₹7.47", calls: "Standard Rate", badge: "Basic", desc: "Top-up balance for international roaming & VAS" },
      { id: 8, price: 100, validity: "Unlimited", talktime: "₹81.75", calls: "Standard Rate", badge: "Popular", desc: "Talktime balance with full value benefits" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        
        {/* Background Decorative Mesh Gradients */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-200 text-indigo-600 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>MobiComm Service Pvt Ltd • Official Prepaid Platform</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
                Prepaid Mobile Recharge <br />
                <span className="text-gradient">In Seconds, 24/7.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
                Official prepaid recharge portal of MobiComm Service Private Ltd. Instant prepaid mobile top-ups, 5G data boosters, talktime packs, and long-validity plans with 0% extra fees and 100% secure OTP verification.
              </p>

              {/* Key Features List */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Instant OTP Login</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Prepaid Plans & Top-ups</span>
                </div>
              </div>

            </div>

            {/* Right Express Recharge & Login Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl relative border border-indigo-100 bg-white">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-indigo-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-indigo-600" />
                      Express Recharge
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Enter your prepaid mobile number to proceed</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-bold">
                    Step 1 of 2
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn font-semibold">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-red-800">{error}</p>
                        {showRegistration && (
                          <p className="mt-1 text-slate-600 font-medium">
                            Please create a RechargeHub customer account to continue.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Registration Prompt Action */}
                  {showRegistration && (
                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-3 animate-fadeIn">
                      <p className="text-xs text-slate-700 font-semibold">
                        Need a new RechargeHub account?
                      </p>
                      <button
                        type="button"
                        onClick={handleRegistration}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        Register Customer Account
                      </button>
                    </div>
                  )}

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue & Send OTP</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Card Footer note */}
                <div className="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    100% Encrypted Login
                  </span>
                  <Link to="/user-login" className="text-indigo-600 hover:underline font-bold">
                    Existing User Login →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Prepaid Plans Explorer Section */}
      <section id="plans" className="py-20 bg-white border-t border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
              Trending Packs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Popular Mobile Recharge Plans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Explore hand-picked high-value unlimited voice, 5G data, and long validity packages.
            </p>

            {/* Plan Category Tabs */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActivePlanTab("unlimited")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activePlanTab === "unlimited"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                Truly Unlimited
              </button>
              <button
                onClick={() => setActivePlanTab("data")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activePlanTab === "data"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                Data Boosters
              </button>
              <button
                onClick={() => setActivePlanTab("topup")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activePlanTab === "topup"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                Talktime Top-up
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {samplePlans[activePlanTab].map((plan) => (
              <div
                key={plan.id}
                className="glass-panel p-6 rounded-3xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-extrabold uppercase tracking-wider">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {plan.validity}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                      ₹{plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ pack</span>
                  </div>

                  <div className="space-y-3 py-4 border-t border-indigo-100 text-sm font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Data Benefits:</span>
                      <span className="font-bold text-slate-900">{plan.data}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Voice Calls:</span>
                      <span className="font-bold text-emerald-600">{plan.calls}</span>
                    </div>
                    {plan.talktime && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Talktime Balance:</span>
                        <span className="font-bold text-amber-600">{plan.talktime}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 italic bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 mt-2 font-medium">
                    {plan.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-6 w-full py-3 rounded-xl bg-indigo-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 text-indigo-600 hover:text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-indigo-200 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-indigo-600/20"
                >
                  <span>Recharge Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer Component */}
      <Footer />

    </div>
  );
}

export default Home;
