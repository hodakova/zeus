export default function AuditOverview() {
  return(
    <div className="audit-grid">
      <div className="audit-card">
        <h3>Informasi Audit</h3>

        <div className="audit-item">
          <span className="audit-label">
            Nama Audit:
          </span>
          Audit Energi Kelistrikan Gedung A Periode 2026
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Status:
          </span>
          Aktif
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Periode:
          </span>
          2026
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Tanggal Audit:
          </span>
          27 Juni 2026
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Auditor:
          </span>
          Asep
        </div>
      </div>

      <div className="audit-card">
        <h3>Informasi Gedung</h3>

        <div className="audit-item">
          <span className="audit-label">
            Nama:
          </span>
          Gedung A
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Lokasi:
          </span>
          Bandung
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Luas:
          </span>
          2000 m²
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Jumlah Lantai:
          </span>
          4
        </div>
      </div>

      <div className="audit-card">
        <h3>Ringkasan Audit</h3>

        <div className="audit-item">
          <span className="audit-label">
            Data Energi:
          </span>
          24 Parameter
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Kepatuhan Standar:
          </span>
          15 / 18 (83%)
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Standar:
          </span>
          ISO 50002 dan
          SNI 03-6196-2000
        </div>

        <div className="audit-item">
          <span className="audit-label">
            Intensitas Konsumsi Energi:
          </span>
          Belum dihitung
        </div>
      </div>
    </div>
  )
}