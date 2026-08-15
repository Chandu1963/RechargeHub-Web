import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rechargePlanService from "../../services/rechargePlanService";
import { Zap, Clock, Wifi, PhoneCall, ArrowRight, Sparkles, Filter } from "lucide-react";
import Pagination from "../../components/pagination/Pagination";

function RechargePlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("POPULAR");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const categories = [
    { id: "POPULAR", label: "Popular Packs", icon: Sparkles },
    { id: "UNLIMITED", label: "Truly Unlimited", icon: Zap },
    { id: "DATA", label: "Data Boosters", icon: Wifi },
    { id: "VALIDITY", label: "Long Validity", icon: Clock },
    { id: "TOPUP", label: "Talktime Top-up", icon: PhoneCall }
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await rechargePlanService.getPlans();
      const plansArray = response.data.data || [];
      setPlans(plansArray);
    } catch (error) {
      console.error("Error fetching plans", error);
      toast.error("Failed to load recharge plans.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    navigate("/user/recharge/create", { state: { selectedPlan: plan } });
  };

  const filteredPlans = plans.filter(
    (plan) => plan.category?.toUpperCase() === activeCategory
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-extrabold uppercase tracking-wider">
          Prepaid Catalog
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Select a Mobile Recharge Plan
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          Filter by category and select your preferred talktime, data, or validity pack.
        </p>
      </div>

      {/* Horizontal Category Tab Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-indigo-100">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-indigo-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500 font-semibold">Fetching latest plans from server...</p>
        </div>
      ) : (
        <>
          {/* Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.length > 0 ? (
              filteredPlans
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((plan) => (
                  <div
                    key={plan.planId}
                    className="glass-panel p-6 rounded-3xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-md hover:shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 text-[11px] font-extrabold uppercase tracking-wider">
                          {plan.category}
                        </span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {plan.validityDays} Days
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-heading">
                          ₹{plan.price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ recharge</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-4 line-clamp-1">
                        {plan.planName}
                      </h4>

                      <div className="space-y-2.5 py-3 border-t border-b border-indigo-100 text-xs font-medium">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Data Benefits:</span>
                          <span className="font-bold text-indigo-600">{plan.dataBenefits || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Talktime:</span>
                          <span className="font-bold text-emerald-600">{plan.talktime || "Unlimited Calls"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">SMS Allowance:</span>
                          <span className="font-bold text-slate-700">
                            {plan.smsPerDay ? `${plan.smsPerDay} SMS/Day` : "N/A"}
                          </span>
                        </div>
                      </div>

                      {plan.description && (
                        <p className="text-[11px] text-slate-600 italic bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 mt-3 font-medium">
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Select & Proceed</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))
            ) : (
              <div className="col-span-full glass-card p-12 rounded-3xl text-center border border-indigo-100 bg-white space-y-3">
                <Filter className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No plans available in this category</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                  Please switch to another tab like "Popular Packs" or "Truly Unlimited" to view active offers.
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {filteredPlans.length > 0 && (
            <div className="pt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredPlans.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newSize) => {
                  setItemsPerPage(newSize);
                  setCurrentPage(1);
                }}
                pageSizeOptions={[6, 12, 18, 24]}
              />
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default RechargePlans;