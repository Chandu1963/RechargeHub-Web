import { Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-indigo-100 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                Mobi<span className="text-indigo-600">Comm</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Official digital prepaid mobile recharge portal of MobiComm Service Private Ltd. Delivering fast, 24/7 prepaid mobile recharges, 5G data boosters, talktime top-ups, and long-validity packs across India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" /> MobiComm Service Pvt Ltd Official Portal
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link to="/user-login" className="hover:text-indigo-600 transition-colors">User Login</Link></li>
              <li><Link to="/customer-registration" className="hover:text-indigo-600 transition-colors">New Registration</Link></li>
              <li><Link to="/admin-login" className="hover:text-indigo-600 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Prepaid Categories */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading">Prepaid Services</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Truly Unlimited Packs</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">5G Data Boosters</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Talktime Top-Up</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Long Validity Plans</li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading">Help & Legal</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Refund Policy</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Contact Support</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 border-t border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} MobiComm Service Private Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 font-mono text-[11px] text-indigo-700 font-semibold">UPI</span>
            <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 font-mono text-[11px] text-indigo-700 font-semibold">VISA</span>
            <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 font-mono text-[11px] text-indigo-700 font-semibold">MasterCard</span>
            <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 font-mono text-[11px] text-indigo-700 font-semibold">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
