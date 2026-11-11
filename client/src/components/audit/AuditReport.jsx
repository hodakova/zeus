import { useAudit } from "../../context/AuditContext";

export default function AuditReport() {
  const {
    totalContinuousKWh,
    totalNoncontinuousKWh,
    totalMonthlyConsumptionKWh,
    annualIke,
    ikeCategory,
  } = useAudit();

  const total = totalMonthlyConsumptionKWh || 1;
  const continuousPct = Math.round(((totalContinuousKWh || 0) / total) * 100);
  const noncontinuousPct = 100 - continuousPct;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 print:hidden">
        <div>
          <h2 className="text-base font-bold text-[#244058]">Dokumen Laporan Resmi</h2>
          <p className="text-xs text-gray-400">Siap diunduh sebagai PDF atau dicetak langsung</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-[#244058] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H7a2 2 0 00-2 2v4h10z" />
          </svg>
          Cetak / Unduh PDF
        </button>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200 text-gray-800 space-y-8 print:shadow-none print:border-none print:p-0">
        
        <div className="border-b-2 border-[#244058] pb-6 flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Laporan Hasil Audit Energi
            </span>
            <h1 className="text-2xl font-bold text-[#244058] mt-1">
              Gedung A - Periode 2026
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Standar Acuan: ISO 50002 & SNI 03-6196-2000
            </p>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-1">
            <div>No. Dokumen: <span className="font-semibold text-gray-700">AUD/2026/GDA-01</span></div>
            <div>Tanggal Audit: <span className="font-semibold text-gray-700">27 Juni 2026</span></div>
            <div>Auditor: <span className="font-semibold text-gray-700">Asep</span></div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#244058] uppercase tracking-wider mb-3">
            1. Ringkasan Kinerja Energi
          </h2>
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">Intensitas Konsumsi Energi</div>
              <div className="text-xl font-bold text-[#244058]">{annualIke} kWh/m²/thn</div>
            </div>
            <div className="border-x border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Kategori Efisiensi</div>
              <div className="text-xl font-bold text-emerald-600">{ikeCategory}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Total Listrik Bulanan</div>
              <div className="text-xl font-bold text-[#244058]">{(totalMonthlyConsumptionKWh ?? 0).toLocaleString()} kWh</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#244058] uppercase tracking-wider mb-3">
            2. Distribusi & Visualisasi Beban Energi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-4 border border-gray-100 rounded-lg">
            
            <div className="flex items-center justify-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#244058" strokeWidth="4" strokeDasharray={`${continuousPct} ${100 - continuousPct}`} strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#38bdf8" strokeWidth="4" strokeDasharray={`${noncontinuousPct} ${100 - noncontinuousPct}`} strokeDashoffset={`-${continuousPct}`} />
                </svg>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#244058]"></span>
                  <span className="text-gray-700 font-medium">Beban Kontinu (24 Jam): <strong>{continuousPct}%</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
                  <span className="text-gray-700 font-medium">Beban Nonkontinu: <strong>{noncontinuousPct}%</strong></span>
                </div>
              </div>
            </div>

            <table className="w-full text-xs text-left">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-500">Konsumsi Beban Kontinu</td>
                  <td className="py-2 font-semibold text-right text-gray-800">{(totalContinuousKWh ?? 0).toLocaleString()} kWh/bln</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-500">Konsumsi Beban Nonkontinu</td>
                  <td className="py-2 font-semibold text-right text-gray-800">{(totalNoncontinuousKWh ?? 0).toLocaleString()} kWh/bln</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-700">Total Akumulasi Listrik</td>
                  <td className="py-2 font-bold text-right text-[#244058]">{(totalMonthlyConsumptionKWh ?? 0).toLocaleString()} kWh/bln</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#244058] uppercase tracking-wider mb-3">
            3. Kesimpulan & Rekomendasi
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-gray-700">
            <p>
              Berdasarkan hasil analisis audit energi kelistrikan pada Gedung A, diperoleh nilai IKE sebesar <strong>{annualIke} kWh/m²/tahun</strong> yang menempatkan gedung pada kategori <strong>{ikeCategory}</strong> sesuai standar SNI 03-6196-2000.
            </p>
            <p>
              Peluang penghematan energi terbesar teridentifikasi pada pengaturan operasional sistem HVAC pada beban nonkontinu serta optimasi beban kontinu 24 jam pada ruang server dan jaringan.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 grid grid-cols-2 text-center text-xs text-gray-600">
          <div>
            <p className="mb-12">Auditor Energi</p>
            <p className="font-bold text-gray-900 underline">Asep</p>
            <p className="text-gray-400">No. Reg. AE-2026-004</p>
          </div>
          <div>
            <p className="mb-12">Penanggung Jawab Gedung</p>
            <p className="font-bold text-gray-900 underline">Dudung</p>
            <p className="text-gray-400">Gedung A</p>
          </div>
        </div>

      </div>
    </div>
  );
}