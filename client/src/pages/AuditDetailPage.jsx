import "../styles/pages.css";

export default function AuditDetailPage() {

  const energyData = [
    {
      id: 1,
      kategori: "Konsumsi Energi",
      parameter: "Total Energi",
      nilai: 12000,
      satuan: "kWh",
    },
    {
      id: 2,
      kategori: "HVAC",
      parameter: "Daya AC",
      nilai: 15,
      satuan: "kW",
    },
    {
      id: 3,
      kategori: "Pencahayaan",
      parameter: "Intensitas Cahaya",
      nilai: 350,
      satuan: "lux",
    },
  ];

  return (
    <>
      <div className="audit-header">
        <h1 className="audit-title">
          Audit Energi Gedung Teknik 2026
        </h1>

        <p className="audit-subtitle">
          Status: Aktif
        </p>
        </div>

        <div className="audit-tabs">
        <button className="audit-tab active">
          Overview
        </button>

        <button className="audit-tab">
          Data Energi
        </button>

        <button className="audit-tab">
          Checklist
        </button>

        <button className="audit-tab">
          Hasil
        </button>

        <button className="audit-tab">
          Laporan
        </button>
        </div>

        <div className="info-grid">
        <div className="info-card">
          <h3>Informasi Gedung</h3>

          <div className="info-item">
          <span className="info-label">
            Luas:
          </span>
            2000 m²
          </div>

          <div className="info-item">
          <span className="info-label">
            Lokasi:
          </span>
            Bandung
          </div>
        </div>

        <div className="info-card">
          <h3>Informasi Audit</h3>

          <div className="info-item">
            <span className="info-label">
                Periode:
            </span>
            2026
          </div>

          <div className="info-item">
          <span className="info-label">
            Auditor:
          </span>
            Asep
          </div>
        </div>
      </div>
    </>
  );
}