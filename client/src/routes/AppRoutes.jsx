import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AuditPage from "../pages/AuditPage";
import BuildingPage from "../pages/BuildingPage";
import SettingsPage from "../pages/SettingsPage";
import AuditDetailPage from "../pages/AuditDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/audits" element={<AuditPage />} />
      <Route path="/buildings" element={<BuildingPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/audits/:id" element={<AuditDetailPage />} />
    </Routes>
  );
}