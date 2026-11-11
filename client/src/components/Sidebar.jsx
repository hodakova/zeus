import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const getNavClass = ({ isActive }) =>
    `px-4 py-2.5 rounded-md text-white no-underline block transition-colors text-sm ${
      isActive ? "bg-white/20 font-semibold shadow-inner" : "hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#244058] text-white p-5 shrink-0">
      <h2 className="text-lg font-bold mb-6 leading-snug">
        Audit Energi Kelistrikan Gedung
      </h2>
      <nav className="flex flex-col gap-1.5">
        <NavLink to="/" className={getNavClass}>
          Dashboard
        </NavLink>
        <NavLink to="/buildings" className={getNavClass}>
          Gedung
        </NavLink>
        <NavLink to="/audits" className={getNavClass}>
          Audit
        </NavLink>
        <NavLink to="/settings" className={getNavClass}>
          Pengaturan
        </NavLink>
      </nav>
    </aside>
  );
}