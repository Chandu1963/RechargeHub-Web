import { Link } from "react-router-dom";
import { Zap, ArrowLeft, ShieldCheck } from "lucide-react";
import { getToken, getRole } from "../utils/jwtUtils";

function AuthLayout({ children, title, subtitle, icon: Icon }) {
  const token = getToken();
  const role = getRole();
  const isAdminLoggedIn = token && (role === "ROLE_ADMIN" || role === "ADMIN");
  const isUserLoggedIn = token && (role === "ROLE_USER" || role === "USER");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Decorative Indigo & Blue Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar */}
      <header className="relative z-10 p-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 font-heading">
              Recharge<span className="text-indigo-600">Hub</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isAdminLoggedIn && (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md"
            >
              <span>Return to Admin Console</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}

          {isUserLoggedIn && (
            <Link
              to="/user/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md"
            >
              <span>Return to User Dashboard</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer copyright note */}
      <footer className="relative z-10 p-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
        <ShieldCheck className="w-4 h-4 text-indigo-600" />
        <span>Protected by 256-bit SSL Encryption & OAuth 2.0 Security Protocol</span>
      </footer>

    </div>
  );
}

export default AuthLayout;
