import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { LayoutDashboard, History, Smartphone, User } from "lucide-react";

function UserLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Sub Navigation Bar for User Portal */}
      <div className="bg-white border-b border-indigo-100 shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink
              to="/user/plans"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
              <Smartphone className="w-4 h-4" />
              Recharge Plans
            </NavLink>

            <NavLink
              to="/user/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
              <History className="w-4 h-4" />
              Recharge History
            </NavLink>

            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
              <User className="w-4 h-4" />
              My Profile
            </NavLink>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;
