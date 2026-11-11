export default function AuditCompliance() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">ISO 50002:2014</h3>
        <div className="mb-2 text-gray-700">Ruang lingkup audit</div>
        <div className="mb-2 text-gray-700">Pengumpulan data historis</div>
        <div className="mb-2 text-gray-700">Pengukuran lapangan</div>
        <div className="mb-2 text-gray-700">Analisis penggunaan energi</div>
        <div className="mb-2 text-gray-700">Penyusunan rekomendasi</div>
      </div>

      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">SNI 03-6196-2000</h3>
        <div className="mb-2 text-gray-700">Perhitungan IKE</div>
        <div className="mb-2 text-gray-700">Evaluasi konsumsi energi</div>
        <div className="mb-2 text-gray-700">Klasifikasi efisiensi energi</div>
      </div>

      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Kepatuhan Standar</h3>
        <div className="mb-4">
          <span className="text-gray-500 text-sm">Persyaratan Terpenuhi</span>
          <h2 className="mt-1 text-[#244058] text-2xl font-bold">15 / 18</h2>
        </div>
        <div className="mb-2">
          <span className="text-gray-500 text-sm">Tingkat Kepatuhan</span>
          <h2 className="mt-1 text-[#244058] text-2xl font-bold">83%</h2>
        </div>
      </div>
    </div>
  );
}