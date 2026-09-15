export default function AuditResult() {
  return (
    <>
      <div className="audit-result-summary-grid">

        <div className="audit-card">
          <h3>IKE</h3>
          <h2>185</h2>
          <p>kWh/m²/tahun</p>
        </div>

        <div className="audit-card">
          <h3>Kategori</h3>
          <h2>Efisien</h2>
        </div>

        <div className="audit-card">
          <h3>Temuan</h3>
          <h2>6</h2>
        </div>

        <div className="audit-card">
          <h3>Rekomendasi</h3>
          <h2>4</h2>
        </div>

      </div>

      <div className="audit-result-detail-grid">

        <div className="audit-card">

          <h3>Ringkasan Temuan</h3>

          <ul>
            <li>Konsumsi energi HVAC relatif tinggi.</li>
            <li>Faktor daya masih dapat ditingkatkan.</li>
            <li>Sebagian lampu masih menggunakan teknologi lama.</li>
          </ul>

        </div>

        <div className="audit-card">

          <h3>Ringkasan Rekomendasi</h3>

          <ul>
            <li>Mengoptimalkan pengoperasian sistem HVAC.</li>
            <li>Mengganti lampu menjadi LED.</li>
            <li>Melakukan pemantauan faktor daya secara berkala.</li>
            <li>Melakukan audit energi secara periodik.</li>
          </ul>

        </div>

      </div>
    </>
  );
}