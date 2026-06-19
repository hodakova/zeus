import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Audit Energi Kelistrikan Gedung</h2>

      <nav>
        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/audits">
          Audit
        </NavLink>

        <NavLink to="/buildings">
          Gedung
        </NavLink>

        <NavLink to="/settings">
          Pengaturan
        </NavLink>
      </nav>
    </aside>
  );
}