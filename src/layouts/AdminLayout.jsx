import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Menu, X, ShieldAlert } from "lucide-react";

function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard Overview";
      case "/admin/customers":
        return "Customer Accounts";
      case "/admin/users":
        return "User Permissions";
      case "/admin/plans":
        return "Recharge Packages";
      case "/admin/history":
        return "Recharge Audit Log";
      case "/admin/expiring":
        return "Expiring Accounts";
      default:
        return "Admin Portal";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Mobile Admin Sub-Navigation Toggle Bar */}
      <div className="md:hidden bg-white border-b border-indigo-100 px-4 py-3 sticky top-20 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-slate-800">{getPageTitle()}</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold hover:bg-indigo-100 transition-all"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileSidebarOpen ? "Close Menu" : "Admin Menu"}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full relative">
        <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;