import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Smartphone,
  History,
  Clock,
  Zap
} from "lucide-react";

function Sidebar() {
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

  const renderNavGroup = (title, items) => (
    <div className="space-y-1.5">
      <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
        {title}
      </div>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
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
    <aside className="w-64 glass-panel border-r border-indigo-100/80 bg-white flex flex-col justify-between p-4 sticky top-20 h-[calc(100vh-5rem)] shadow-sm">
      <div className="space-y-5 overflow-y-auto pr-1">
        {renderNavGroup("Main View", mainItems)}
        {renderNavGroup("User & Plan Management", managementItems)}
        {renderNavGroup("Transactions & Audit", reportItems)}
      </div>

    </aside>
  );
}

export default Sidebar;