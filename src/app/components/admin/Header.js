// components/admin/Header.js
export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-[#0f141b] p-4 shadow-lg shadow-black/20">
      <h1 className="text-lg font-semibold text-slate-100">Admin Panel</h1>
      <div className="text-sm text-slate-400">Welcome, Admin</div>
    </header>
  );
}
