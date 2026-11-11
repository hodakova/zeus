export default function AuditReport() {
  return (
    <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
      <h2 className="mt-3 text-[#244058] text-2xl font-bold">Laporan Audit Energi</h2>
      <hr className="my-4 border-gray-200" />
      <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Informasi Audit</h3>
      <p className="my-2 text-gray-600">Audit Energi Kelistrikan Gedung Teknik</p>
      <p className="my-2 text-gray-600">Periode: 2026</p>
      <p className="my-2 text-gray-600">Auditor: Asep</p>
      
      <h3 className="mt-6 mb-2.5 text-[#244058] font-bold text-lg">Ringkasan Hasil</h3>
      <ul className="pl-5 mt-3 list-disc text-gray-600">
        <li className="mb-2">IKE : 185 kWh/m² /tahun</li>
        <li className="mb-2">Kategori : Efisien</li>
        <li className="mb-2">Temuan : 6</li>
        <li className="mb-2">Rekomendasi : 4</li>
      </ul>

      <h3 className="mt-6 mb-2.5 text-[#244058] font-bold text-lg">Kesimpulan</h3>
      <p className="my-2 text-gray-600 leading-relaxed">
        Berdasarkan hasil audit, konsumsi energi gedung masih berada
        pada kategori efisien. Meskipun demikian, masih terdapat
        beberapa peluang konservasi energi terutama pada sistem HVAC,
        pencahayaan, dan faktor daya.
      </p>
      <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium hover:opacity-90 transition-opacity mt-4">
        Unduh PDF
      </button>
    </div>
  );
}