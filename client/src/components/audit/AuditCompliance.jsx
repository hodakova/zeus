export default function AuditCompliance() {
  return (
    <>
      <div className="audit-grid">

        <div className="audit-card">

          <h3>ISO 50002:2014</h3>

          <div className="audit-item">✔ Ruang lingkup audit</div>
          <div className="audit-item">✔ Pengumpulan data historis</div>
          <div className="audit-item">✔ Pengukuran lapangan</div>
          <div className="audit-item">✔ Analisis penggunaan energi</div>
          <div className="audit-item">✔ Penyusunan rekomendasi</div>

        </div>

        <div className="audit-card">

          <h3>SNI 03-6196-2000</h3>

          <div className="audit-item">✔ Perhitungan IKE</div>
          <div className="audit-item">✔ Evaluasi konsumsi energi</div>
          <div className="audit-item">✔ Klasifikasi efisiensi energi</div>

        </div>

        <div className="audit-card">

          <h3>Kepatuhan Standar</h3>

          <div className="audit-item">
            Persyaratan Terpenuhi
          </div>

          <h2>15 / 18</h2>

          <div className="audit-item">
            Tingkat Kepatuhan
          </div>

          <h2>83%</h2>

        </div>

      </div>
    </>
  );
}