import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, History, User, LogOut, ArrowRight, ShieldCheck } from "lucide-react";
import api from "../../api/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID is missing from Local Storage");
          return;
        }

        const response = await api.get(`/users/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/user-login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-100 bg-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Welcome back, {user?.customer?.customerName || "Valued Customer"}!
            </h2>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Mobile: {user?.customer?.mobileNumber || "Prepaid Account"} • Active Connection
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4 text-indigo-600" />
          Logout Account
        </button>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* New Recharge Card */}
        <div className="glass-card p-8 rounded-3xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-md hover:shadow-xl">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">New Mobile Recharge</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Explore 5G unlimited plans, data boosters, talktime packs, and instant recharge for your mobile number.
            </p>
          </div>

          <button
            onClick={() => navigate("/user/plans")}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Recharge Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recharge History Card */}
        <div className="glass-card p-8 rounded-3xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-md hover:shadow-xl">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <History className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Recharge History</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Track past payment transactions, view active plan validity dates, and download payment receipts.
            </p>
          </div>

          <button
            onClick={() => navigate("/user/history")}
            className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <span>View Transaction History</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Account Info Badge */}
      <div className="p-6 rounded-2xl glass-panel border border-indigo-100 bg-white flex items-center justify-between text-xs text-slate-600 font-semibold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>MobiComm Verified Customer Account</span>
        </div>
        <span className="font-mono text-slate-500">Circle: {user?.customer?.circle || "All India"}</span>
      </div>

    </div>
  );
}

export default Dashboard;
