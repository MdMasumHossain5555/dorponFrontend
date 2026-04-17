// app/admin/layout.js
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({ children }) {
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
