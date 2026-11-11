import { Link } from "react-router-dom";

export default function AuditPage() {
  const audits = [
    { id: 1, building: "Gedung A", period: "2025", status: "Selesai" },
    { id: 2, building: "Gedung B", period: "2026", status: "Aktif" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244058]">
          Daftar Audit
        </h1>
        <div className="flex gap-3">
          <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="text-xs font-bold">+</span>
            Audit Baru
          </button>
        </div>
      </div>
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <thead className="bg-[#244058] text-white">
          <tr>
            <th className="px-4.5 py-3.5 text-left font-semibold">Gedung</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Periode</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Status</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4.5 py-3.5">{audit.building}</td>
              <td className="px-4.5 py-3.5">{audit.period}</td>
              <td className="px-4.5 py-3.5">{audit.status}</td>
              <td className="px-4.5 py-3.5">
                <Link
                  to={`/audits/${audit.id}`}
                  className="inline-block px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white text-sm hover:bg-gray-100 font-medium"
                >
                  Lihat Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}