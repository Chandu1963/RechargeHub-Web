import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;