'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Gauge, PieChart, LogIn, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'แดชบอร์ด', icon: Home },
  { href: '/kpi-matrix', label: 'ตาราง KPI', icon: BarChart3 },
  { href: '/kpi-comparison', label: 'เปรียบเทียบ KPI', icon: Gauge },
  { href: '/hospital-summary', label: 'สรุปโรงพยาบาล', icon: PieChart },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="bg-[#0f172a] border-b-3 border-[#3b82f6] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">
            KPI<span className="text-cyan-400">DASHBOARD</span>
          </span>
        </Link>

        {/* Hamburger button — visible on mobile only */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop nav — hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'text-blue-400 font-semibold bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="ml-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition-all flex items-center gap-1.5"
          >
            เข้าสู่ระบบ <LogIn size={14} />
          </Link>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-1 border-t border-white/10 pt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'text-blue-400 font-semibold bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 mt-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-3 py-2.5 rounded-lg transition-all"
          >
            <LogIn size={18} />
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </nav>
  );
}
