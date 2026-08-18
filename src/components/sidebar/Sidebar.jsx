import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Smartphone,
  History,
  Clock,
  Zap,
  X,
  ShieldAlert
} from "lucide-react";

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const mainItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard Overview",
      icon: <LayoutDashboard className="w-4 h-4" />
    }
  ];

  const managementItems = [
    {
      path: "/admin/customers",
      label: "Customer Accounts",
      icon: <Users className="w-4 h-4" />
    },
    {
      path: "/admin/users",
      label: "User Permissions",
      icon: <UserCheck className="w-4 h-4" />
    },
    {
      path: "/admin/plans",
      label: "Recharge Packages",
      icon: <Smartphone className="w-4 h-4" />
    }
  ];

  const reportItems = [
    {
      path: "/admin/history",
      label: "Recharge Audit Log",
      icon: <History className="w-4 h-4" />
    },
    {
      path: "/admin/expiring",
      label: "Expiring Accounts",
      icon: <Clock className="w-4 h-4" />
    }
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const renderNavGroup = (title, items) => (
    <div className="space-y-1.5">
      <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
        {title}
      </div>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
              ? "bg-gradient-to-r from-indigo-50 via-blue-50/50 to-indigo-50/20 text-indigo-600 font-bold border-l-4 border-indigo-600 shadow-2xs"
              : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 hover:translate-x-1"
            }`
          }
        >
          <span className="text-current">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`
          glass-panel border-r border-indigo-100/80 bg-white flex flex-col justify-between p-4 shadow-sm transition-all duration-300
          fixed inset-y-0 left-0 w-72 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64 md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:z-auto
        `}
      >
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-indigo-50 md:hidden">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <span className="font-extrabold text-sm text-slate-800 font-heading">Admin Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto pr-1 flex-1">
          {renderNavGroup("Main View", mainItems)}
          {renderNavGroup("User & Plan Management", managementItems)}
          {renderNavGroup("Transactions & Audit", reportItems)}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;