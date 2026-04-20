"use client";

import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminShellLoader() {
  return <div className="min-h-screen bg-[#0b0f14]" />;
}

export default function AdminShell({ children }) {
  const { isLoading, isAdmin, isAuthenticated } = useAuthGuard({
    redirectPath: "/signin",
    unauthorizedPath: "/",
    requireAdmin: true,
  });

  if (isLoading || !isAuthenticated || !isAdmin) {
    return <AdminShellLoader />;
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f14] text-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#10151d] p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}