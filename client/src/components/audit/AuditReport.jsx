export default function AuditReport() {
  return (
    <>
      <div className="audit-card">

        <h2>Laporan Audit Energi</h2>

        <hr />

        <h3>Informasi Audit</h3>

        <p>Audit Energi Kelistrikan Gedung Teknik</p>

        <p>Periode: 2026</p>

        <p>Auditor: Asep</p>

        <h3>Ringkasan Hasil</h3>

        <ul>
          <li>IKE : 185 kWh/m²/tahun</li>
          <li>Kategori : Efisien</li>
          <li>Temuan : 6</li>
          <li>Rekomendasi : 4</li>
        </ul>

        <h3>Kesimpulan</h3>

        <p>
          Berdasarkan hasil audit, konsumsi energi gedung masih berada
          pada kategori efisien. Meskipun demikian, masih terdapat
          beberapa peluang konservasi energi terutama pada sistem HVAC,
          pencahayaan, dan faktor daya.
        </p>

        <button className="primary-button">
          Unduh PDF
        </button>

      </div>
    </>
  );
}