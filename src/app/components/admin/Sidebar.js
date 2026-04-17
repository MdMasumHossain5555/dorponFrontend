// components/admin/Sidebar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, CreditCard, Settings } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: CreditCard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 border-r border-slate-800 bg-[#0f141b]">
      <div className="border-b border-slate-800 p-4 text-xl font-bold text-slate-100">
        Admin Panel
      </div>
      <nav className="p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname?.startsWith(href));

          return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg p-2 transition ${
              isActive
                ? "bg-[#D4AF37]/20 text-[#f3d37a]"
                : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );})}
      </nav>
    </div>
  );
}
