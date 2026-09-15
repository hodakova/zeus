import { useState } from "react";

import "../styles/pages.css";
import "../components/audit/audit.css";

import AuditOverview from "../components/audit/AuditOverview";
import AuditEnergy from "../components/audit/AuditEnergy";
import AuditCompliance from "../components/audit/AuditCompliance";
import AuditResult from "../components/audit/AuditResult";
import AuditReport from "../components/audit/AuditReport";

export default function AuditDetailPage() {

  const [activeTab, setActiveTab] = useState("overview");

  const auditEnergyData = [
    {
      id: 1,
      kategori: "Konsumsi Energi",
      parameter: "Total Konsumsi Energi",
      nilai: 12000,
      satuan: "kWh",
    },
    {
      id: 2,
      kategori: "HVAC",
      parameter: "Daya Aktual AC",
      nilai: 15,
      satuan: "kW",
    },
    {
      id: 3,
      kategori: "Pencahayaan",
      parameter: "Intensitas Pencahayaan",
      nilai: 350,
      satuan: "lux",
    },
    {
      id: 4,
      kategori: "Faktor Daya",
      parameter: "Faktor Daya",
      nilai: 0.92,
      satuan: "-",
    },
  ];

  return (
    <>
      <div className="audit-header">
        <h1 className="audit-title">
          Audit Energi Kelistrikan Gedung A Periode 2026
        </h1>

        <p className="audit-subtitle">
          Status: Aktif
        </p>
      </div>

      <div className="audit-tabs">
        <button 
          className={`audit-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button 
          className={`audit-tab ${activeTab === "energy" ? "active" : ""}`}
          onClick={() => setActiveTab("energy")}
        >
          Data Energi
        </button>

        <button 
          className={`audit-tab ${activeTab === "compliance" ? "active" : ""}`}
          onClick={() => setActiveTab("compliance")}
        >
          Kepatuhan Standar
        </button>

        <button
          className={`audit-tab ${activeTab === "result" ? "active" : ""}`}
          onClick={() => setActiveTab("result")}
        >
          Hasil
        </button>

        <button 
          className={`audit-tab ${activeTab === "report" ? "active" : ""}`}
          onClick={() => setActiveTab("report")}
        >
          Laporan
        </button>
      </div>

      <div className="audit-content">
        {activeTab === "overview" && (
          <AuditOverview />
        )}

        {activeTab === "energy" && (
          <AuditEnergy
            auditEnergyData ={auditEnergyData }
          />
        )}

        {activeTab === "compliance" && (
          <AuditCompliance />
        )}

        {activeTab === "result" && (
          <AuditResult />
        )}

        {activeTab === "report" && (
          <AuditReport />
        )}
      </div>
    </>
  );
}