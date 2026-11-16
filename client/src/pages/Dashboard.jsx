import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const activeAudits = [
    {
      id: 1,
      building: "Gedung Kerjasama PLN-ITB",
      period: "2026",
      auditor: "Asep",
      status: "Aktif",
      progress: "60%",
    },
    {
      id: 2,
      building: "Labtek V Benny Subianto ITB",
      period: "2025",
      auditor: "Pepen",
      status: "Selesai",
      progress: "100%",
    },
  ];

  const highEnergyBuildings = [
    {
      name: "Labtek V Benny Subianto ITB",
      ike: 210,
      unit: "kWh/m²/thn",
      category: "Cukup Efisien",
      consumption: "35,000 kWh/bln",
    },
    {
      name: "Gedung Kerjasama PLN-ITB",
      ike: 172,
      unit: "kWh/m²/thn",
      category: "Efisien",
      consumption: "28,667 kWh/bln",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#244058]">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">
            Ringkasan performa energi dan status pelaksanaan audit gedung
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/buildings"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            + Tambah Gedung
          </Link>
          <Link
            to="/audits"
            className="bg-[#244058] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            + Audit Baru
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Audit" value="12" subtitle="Seluruh riwayat audit" />
        <StatCard title="Audit Aktif" value="3" subtitle="Sedang dalam proses" />
        <StatCard title="Audit Selesai" value="9" subtitle="Laporan diterbitkan" />
        <StatCard title="Rata-rata IKE" value="191" subtitle="kWh/m²/tahun" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#244058] mb-1">
              Distribusi Performa IKE
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Klasifikasi efisiensi gedung terdaftar
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-700">Efisien (&lt; 180 kWh/m²/thn)</span>
                  <span className="text-gray-600">6 Gedung (50%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[50%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-700">Cukup Efisien (180 - 250)</span>
                  <span className="text-gray-600">4 Gedung (33%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[33%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-rose-700">Boros (&gt; 250 kWh/m²/thn)</span>
                  <span className="text-gray-600">2 Gedung (17%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[17%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-gray-500">
            * Standar acuan: <strong>SNI 03-6196-2000, ISO 50001, & ISO 50002</strong>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-[#244058]">
                Gedung Konsumsi Energi Tertinggi
              </h3>
              <p className="text-xs text-gray-400">
                Prioritas target program konservasi &amp; retrofit energi
              </p>
            </div>
            <Link
              to="/buildings"
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-3">
            {highEnergyBuildings.map((b, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#244058]">{b.name}</h4>
                  <span className="text-xs text-gray-500">
                    Est. Konsumsi: {b.consumption}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">
                    {b.ike} <span className="text-xs font-normal text-gray-500">{b.unit}</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5 ${
                      b.category === "Efisien"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {b.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-[#244058]">
              Proyek Audit Berjalan &amp; Terakhir
            </h3>
            <p className="text-xs text-gray-400">
              Pantau progres pengisian data dan kepatuhan audit
            </p>
          </div>
          <Link
            to="/audits"
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Kelola Audit →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[#244058] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama Gedung</th>
                <th className="px-4 py-3 font-semibold">Periode</th>
                <th className="px-4 py-3 font-semibold">Auditor</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activeAudits.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-semibold text-[#244058]">
                    {a.building}
                  </td>
                  <td className="px-4 py-3.5 text-gray-700">{a.period}</td>
                  <td className="px-4 py-3.5 text-gray-600">{a.auditor}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        a.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      to={`/audits/${a.id}`}
                      className="inline-block px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-100 font-medium transition"
                    >
                      👁 Detail Audit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}