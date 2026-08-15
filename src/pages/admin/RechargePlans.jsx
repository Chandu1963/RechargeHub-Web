import { useEffect, useState } from "react";
import rechargePlanService from "../../services/rechargePlanService";
import { Edit2, Trash2, Plus, X, Smartphone } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination/Pagination";

function AdminRechargePlans() {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    planName: "",
    category: "",
    price: "",
    validityDays: "",
    dataBenefits: "",
    talktime: "",
    smsPerDay: "",
    description: "",
    status: "ACTIVE"
  });

  const fetchPlans = async () => {
    try {
      const response = await rechargePlanService.getPlans();
      setPlans(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching recharge plans:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch recharge plans"
      );
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      planName: "",
      category: "",
      price: "",
      validityDays: "",
      dataBenefits: "",
      talktime: "",
      smsPerDay: "",
      description: "",
      status: "ACTIVE"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (plan) => {
    setEditingId(plan.planId);
    setFormData({
      planName: plan.planName || "",
      category: plan.category || "",
      price: plan.price ?? "",
      validityDays: plan.validityDays ?? "",
      dataBenefits: plan.dataBenefits || "",
      talktime: plan.talktime || "",
      smsPerDay: plan.smsPerDay ?? "",
      description: plan.description || "",
      status: plan.status || "ACTIVE"
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        planName: formData.planName,
        category: formData.category,
        price: Number(formData.price),
        validityDays: Number(formData.validityDays),
        dataBenefits: formData.dataBenefits,
        talktime: formData.talktime,
        smsPerDay: formData.smsPerDay === "" ? null : Number(formData.smsPerDay),
        description: formData.description,
        status: formData.status
      };

      if (editingId) {
        await rechargePlanService.updatePlan(editingId, requestData);
        toast.success("Recharge plan updated successfully");
      } else {
        await rechargePlanService.createPlan(requestData);
        toast.success("Recharge plan created successfully");
      }

      resetForm();
      fetchPlans();
    } catch (error) {
      console.error("Error saving recharge plan:", error);
      toast.error(
        error.response?.data?.message || "Failed to save recharge plan"
      );
    }
  };

  const handleDelete = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this recharge plan?")) {
      return;
    }

    try {
      await rechargePlanService.deletePlan(planId);
      toast.success("Recharge plan deleted successfully");
      fetchPlans();
    } catch (error) {
      console.error("Error deleting recharge plan:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete recharge plan"
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-indigo-600" />
            Manage Recharge Plans
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Create, edit, or configure prepaid recharge options for MobiComm subscribers
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Recharge Plan</span>
        </button>
      </div>

      {/* Create / Edit Form Modal/Card */}
      {showForm && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-100 bg-white shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-indigo-100">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {editingId ? "Edit Prepaid Plan" : "Create New Prepaid Plan"}
            </h3>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-indigo-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Plan Name
                </label>
                <input
                  type="text"
                  name="planName"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.planName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="POPULAR">POPULAR</option>
                  <option value="DATA">DATA</option>
                  <option value="UNLIMITED">UNLIMITED</option>
                  <option value="VALIDITY">VALIDITY</option>
                  <option value="TOPUP">TOPUP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-bold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Validity (Days)
                </label>
                <input
                  type="number"
                  name="validityDays"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.validityDays}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Data Benefits
                </label>
                <input
                  type="text"
                  name="dataBenefits"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. 1.5 GB/day"
                  value={formData.dataBenefits}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Talktime
                </label>
                <input
                  type="text"
                  name="talktime"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. Unlimited"
                  value={formData.talktime}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  SMS Per Day
                </label>
                <input
                  type="number"
                  name="smsPerDay"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.smsPerDay}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-semibold bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-900 font-medium border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs transition-all shadow-md"
              >
                {editingId ? "Update Plan" : "Create Plan"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="py-3 px-6 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs transition-all border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Table */}
      <div className="glass-panel rounded-3xl border border-indigo-100 bg-white overflow-hidden shadow-xl">
        {plans.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">
            No recharge plans found. Click "Add New Recharge Plan" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700 uppercase tracking-wider font-bold border-b border-indigo-100">
                  <th className="p-4">ID</th>
                  <th className="p-4">Plan Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Validity</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Talktime</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((plan) => (
                  <tr key={plan.planId} className="hover:bg-indigo-50/50 transition-colors text-slate-700">
                    <td className="p-4 font-mono font-bold text-slate-600">#{plan.planId}</td>
                    <td className="p-4 font-bold text-slate-900">{plan.planName}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold">
                        {plan.category}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-indigo-600 text-sm">₹{plan.price}</td>
                    <td className="p-4 font-semibold text-slate-700">{plan.validityDays} days</td>
                    <td className="p-4 text-slate-600 font-medium">{plan.dataBenefits || "-"}</td>
                    <td className="p-4 text-slate-600 font-medium">{plan.talktime || "-"}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          plan.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                          title="Edit Plan"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.planId)}
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="p-4 border-t border-indigo-100 bg-white">
          <Pagination
            currentPage={currentPage}
            totalItems={plans.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default AdminRechargePlans;
