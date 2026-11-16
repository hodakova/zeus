import { useState } from "react";
import AuditOverview from "../components/audit/AuditOverview";
import AuditEnergy from "../components/audit/AuditEnergy";
import AuditContinuousLoad from "../components/audit/AuditContinuousLoad";
import AuditNoncontinuousLoad from "../components/audit/AuditNoncontinuousLoad";
import AuditCompliance from "../components/audit/AuditCompliance";
import AuditResult from "../components/audit/AuditResult";
import AuditReport from "../components/audit/AuditReport";

export default function AuditDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const auditStatus = "Aktif"; 

  const getTabClass = (tabName) =>
    `px-4 py-2 border rounded-lg cursor-pointer font-medium text-sm transition-colors ${
      activeTab === tabName
        ? "bg-[#244058] text-white border-[#244058]"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[#244058]">
              Audit Energi Kelistrikan Gedung Kerjasama PLN-ITB Periode 2026
            </h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                auditStatus === "Aktif"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              Status: {auditStatus}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Gedung Kerjasama PLN-ITB • Kota Bandung • Auditor: Asep
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          className={getTabClass("overview")}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={getTabClass("energy")}
          onClick={() => setActiveTab("energy")}
        >
          Data Energi
        </button>
        <button
          className={getTabClass("continuous")}
          onClick={() => setActiveTab("continuous")}
        >
          Beban Kontinu
        </button>
        <button
          className={getTabClass("noncontinuous")}
          onClick={() => setActiveTab("noncontinuous")}
        >
          Beban Nonkontinu
        </button>
        <button
          className={getTabClass("compliance")}
          onClick={() => setActiveTab("compliance")}
        >
          Kepatuhan Standar
        </button>
        <button
          className={getTabClass("result")}
          onClick={() => setActiveTab("result")}
        >
          Hasil
        </button>
        <button
          className={getTabClass("report")}
          onClick={() => setActiveTab("report")}
        >
          Laporan
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "overview" && <AuditOverview />}
        {activeTab === "energy" && <AuditEnergy />}
        {activeTab === "continuous" && <AuditContinuousLoad />}
        {activeTab === "noncontinuous" && <AuditNoncontinuousLoad />}
        {activeTab === "compliance" && <AuditCompliance />}
        {activeTab === "result" && <AuditResult />}
        {activeTab === "report" && <AuditReport />}
      </div>
    </>
  );
}