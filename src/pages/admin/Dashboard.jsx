import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserCheck, 
  Smartphone, 
  History, 
  Clock, 
  LogOut, 
  ArrowRight, 
  ShieldAlert 
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.info("Admin logged out");
    navigate("/admin-login");
  };

  const adminFeatures = [
    {
      title: "Customers",
      desc: "View, filter, and manage registered RechargeHub subscribers.",
      path: "/admin/customers",
      icon: <Users className="w-7 h-7 text-indigo-600" />,
      badgeBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
      btnBg: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-600/20"
    },
    {
      title: "User Accounts",
      desc: "Monitor system user logins, role access, and permissions.",
      path: "/admin/users",
      icon: <UserCheck className="w-7 h-7 text-emerald-600" />,
      badgeBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
      btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
    },
    {
      title: "Recharge Plans",
      desc: "Create, update, and manage prepaid plans, data boosters, and talktime.",
      path: "/admin/plans",
      icon: <Smartphone className="w-7 h-7 text-blue-600" />,
      badgeBg: "bg-blue-50 border-blue-200 text-blue-600",
      btnBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
    },
    {
      title: "Recharge History",
      desc: "Inspect all customer transaction logs, payment statuses, and receipts.",
      path: "/admin/history",
      icon: <History className="w-7 h-7 text-indigo-600" />,
      badgeBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
      btnBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
    },
    {
      title: "Expiring Recharges",
      desc: "Monitor active customer plans that are expiring within the next 3 days.",
      path: "/admin/expiring",
      icon: <Clock className="w-7 h-7 text-amber-600" />,
      badgeBg: "bg-amber-50 border-amber-200 text-amber-600",
      btnBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-600" />
            Admin Command Center
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            RechargeHub Operational Administration & Management Console
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4 text-indigo-600" />
          Logout Admin
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((item) => (
          <div
            key={item.title}
            className="glass-panel p-6 rounded-3xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className={`w-14 h-14 rounded-2xl ${item.badgeBg} border flex items-center justify-center`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>

            <button
              onClick={() => navigate(item.path)}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${item.btnBg}`}
            >
              <span>Access {item.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
