export default function AuditResult() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">IKE</h3>
          <h2 className="mt-1 text-[#244058] text-3xl font-bold">185</h2>
          <p className="my-2 text-gray-600 text-sm">kWh/m² /tahun</p>
        </div>
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Kategori</h3>
          <h2 className="mt-1 text-[#244058] text-3xl font-bold">Efisien</h2>
        </div>
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Temuan</h3>
          <h2 className="mt-1 text-[#244058] text-3xl font-bold">6</h2>
        </div>
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Rekomendasi</h3>
          <h2 className="mt-1 text-[#244058] text-3xl font-bold">4</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Ringkasan Temuan</h3>
          <ul className="pl-5 mt-3 list-disc text-gray-700">
            <li className="mb-2">Konsumsi energi HVAC relatif tinggi.</li>
            <li className="mb-2">Faktor daya masih dapat ditingkatkan.</li>
            <li className="mb-2">Sebagian lampu masih menggunakan teknologi lama.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
          <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Ringkasan Rekomendasi</h3>
          <ul className="pl-5 mt-3 list-disc text-gray-700">
            <li className="mb-2">Mengoptimalkan pengoperasian sistem HVAC.</li>
            <li className="mb-2">Mengganti lampu menjadi LED.</li>
            <li className="mb-2">Melakukan pemantauan faktor daya secara berkala.</li>
            <li className="mb-2">Melakukan audit energi secara periodik.</li>
          </ul>
        </div>
      </div>
    </>
  );
}