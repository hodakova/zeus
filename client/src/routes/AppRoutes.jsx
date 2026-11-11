import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AuditPage from "../pages/AuditPage";
import AuditDetailPage from "../pages/AuditDetailPage";
import BuildingPage from "../pages/BuildingPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/buildings" element={<BuildingPage />} />
      <Route path="/audits" element={<AuditPage />} />
      <Route path="/audits/:id" element={<AuditDetailPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}