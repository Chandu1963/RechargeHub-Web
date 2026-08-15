import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getToken, getRole } from "../../utils/jwtUtils";
import { 
  Zap, 
  Smartphone, 
  ShieldCheck, 
  Gift, 
  User, 
  ShieldAlert, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const token = getToken();
  const role = getRole();
  const isAdminLoggedIn = token && (role === "ROLE_ADMIN" || role === "ADMIN");
  const isUserLoggedIn = token && (role === "ROLE_USER" || role === "USER");
  const isAdminRoute = location.pathname.startsWith("/admin") || isAdminLoggedIn;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-indigo-100 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 font-heading">
                Mobi<span className="text-indigo-600">Comm</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 block -mt-1">
                Service Pvt Ltd • Official Prepaid Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Quick Recharge
              </span>
            </Link>

            <a
              href="#plans"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-indigo-500" />
              Prepaid Plans
            </a>
          </nav>

          {/* Action Buttons (User Login & Admin Portal) */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminRoute ? (
              <>
                <Link
                  to={isUserLoggedIn ? "/user/dashboard" : "/user-login"}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  {isUserLoggedIn ? "User Dashboard" : "User Portal"}
                </Link>

                <Link
                  to="/admin/dashboard"
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-xl group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
                >
                  <span className="relative px-4 py-2 flex items-center gap-2 text-white">
                    <ShieldAlert className="w-4 h-4 text-white" />
                    Admin Console
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </>
            ) : isUserLoggedIn ? (
              <>
                <Link
                  to={isAdminLoggedIn ? "/admin/dashboard" : "/admin-login"}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                  {isAdminLoggedIn ? "Admin Console" : "Admin Portal"}
                </Link>

                <Link
                  to="/user/dashboard"
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-xl group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
                >
                  <span className="relative px-4 py-2 flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-white" />
                    User Dashboard
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={isAdminLoggedIn ? "/admin/dashboard" : "/admin-login"}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                  {isAdminLoggedIn ? "Admin Console" : "Admin Portal"}
                </Link>

                <Link
                  to="/user-login"
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-xl group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
                >
                  <span className="relative px-4 py-2 flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-white" />
                    User Login
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-indigo-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200"
          >
            <span className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              Quick Recharge
            </span>
          </Link>
          
          <a
            href="#plans"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-indigo-500" />
              Prepaid Plans
            </span>
          </a>

          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Why Choose Us
            </span>
          </a>

          <div className="pt-3 border-t border-indigo-100 flex flex-col gap-2">
            {isAdminRoute ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <ShieldAlert className="w-5 h-5" />
                  Admin Console
                </Link>
                <Link
                  to="/user-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-center flex items-center justify-center gap-2 border border-indigo-200"
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  User Portal
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/user-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <User className="w-5 h-5" />
                  User Login
                </Link>

                <Link
                  to="/admin-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-center flex items-center justify-center gap-2 border border-indigo-200"
                >
                  <ShieldAlert className="w-4 h-4 text-indigo-600" />
                  Admin Portal Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;