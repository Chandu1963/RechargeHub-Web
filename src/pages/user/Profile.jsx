import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { User, ArrowLeft, Save, Lock, ShieldCheck } from "lucide-react";

function Profile() {

const navigate = useNavigate();
const location = useLocation();

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

const [formData, setFormData] = useState({
    customerName: "",
    email: ""
});

useEffect(() => {
    const fetchProfile = async () => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                toast.error("User ID not found");
                setLoading(false);
                return;
            }

            const response = await api.get(`/users/${userId}`);
            const userData = response.data.data || response.data;

            setUser(userData);
            setFormData({
                customerName: userData?.customer?.customerName || "",
                email: userData?.customer?.email || ""
            });
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            toast.error("Failed to load profile details.");
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, []);

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("User ID not found");
            return;
        }

        setSaving(true);

        const response = await api.put(`/users/update/${userId}`, {
            customerName: formData.customerName,
            email: formData.email
        });

        const updatedUser = response.data.data || response.data;
        setUser(updatedUser);

        setFormData({
            customerName: updatedUser?.customer?.customerName || formData.customerName,
            email: updatedUser?.customer?.email || formData.email
        });

        // Update local storage name if present
        if (formData.customerName) {
            localStorage.setItem("userName", formData.customerName);
        }

        toast.success("Profile details updated successfully!");
    } catch (error) {
        console.error("Failed to update profile:", error);
        toast.error(
            error?.response?.data?.message || "Failed to update profile details."
        );
    } finally {
        setSaving(false);
    }
};

if (loading) {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Profile...</p>
        </div>
    );
}

const customerName = user?.customer?.customerName || "Customer";
const avatarInitials = customerName.substring(0, 2).toUpperCase();

return (
    <div className="max-w-3xl mx-auto my-6 px-4 animate-fadeIn space-y-6">
        
        {/* Top Header & Navigation */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <User className="w-6 h-6 text-indigo-600" />
                    Account Settings
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your personal information, notification email, and security status</p>
            </div>

            <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all"
                onClick={() => navigate("/user/dashboard")}
            >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
            </button>
        </div>

        {/* Profile Card */}
        <div className="card glass-panel border border-indigo-100 bg-white shadow-xl rounded-3xl overflow-hidden">
            
            {/* Header Profile Avatar Bar */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-xl flex items-center justify-center shadow-lg font-heading">
                        {avatarInitials}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-heading text-white mb-0">{customerName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-extrabold uppercase flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                                {user?.status || "ACTIVE"}
                            </span>
                            <span className="text-xs text-white/80 font-medium font-mono">
                                +91 {user?.customer?.mobileNumber || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Editable Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full py-3 px-4 rounded-xl glass-input text-sm font-bold text-slate-900 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 rounded-xl glass-input text-sm font-bold text-slate-900 border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                    </div>

                    {/* Read-Only Account Attributes */}
                    <div className="p-4 rounded-2xl border border-indigo-100 bg-slate-50/60 space-y-3">
                        <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                            <span>Account Details</span>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Tied to Telecom Identity
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                                <span className="text-slate-500 block text-[11px] font-semibold mb-0.5">Mobile Number</span>
                                <span className="font-bold font-mono text-slate-900">+91 {user?.customer?.mobileNumber || "N/A"}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                                <span className="text-slate-500 block text-[11px] font-semibold mb-0.5">Telecom Circle</span>
                                <span className="font-bold text-slate-900">{user?.customer?.circle || "India"}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                                <span className="text-slate-500 block text-[11px] font-semibold mb-0.5">Account Role</span>
                                <span className="font-bold text-indigo-600 uppercase">{user?.role || "USER"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Saving Changes...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save Profile Changes</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>

        </div>

    </div>
);

}

export default Profile;
