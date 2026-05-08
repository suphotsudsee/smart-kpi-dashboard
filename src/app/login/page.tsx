import Link from 'next/link';
import { BarChart3, User, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={30} className="text-blue-600" />
          </div>
          <h3 className="text-white font-bold text-xl">KPI DASHBOARD</h3>
          <p className="text-blue-200 text-sm mt-1">KPI Management System</p>
        </div>

        {/* Form */}
        <form className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-1.5">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้งาน"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="รหัสผ่าน"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            เข้าสู่ระบบ <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center pb-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-blue-500">กลับหน้าแรก</Link>
          <span className="mx-2">|</span>
          © 2569 KPI Management System
        </div>
      </div>
    </div>
  );
}
