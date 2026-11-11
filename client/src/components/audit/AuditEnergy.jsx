import { useAudit } from "../../context/AuditContext";

export default function AuditEnergy() {
  const { energyData } = useAudit();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-[#244058]">
          Data Energi
        </h2>
        <div className="flex gap-3">
          <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
            Edit Data
          </button>
          <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="text-xs font-bold">+</span>
            Tambah Data
          </button>
        </div>
      </div>
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <thead className="bg-[#244058] text-white">
          <tr>
            <th className="px-4.5 py-3.5 text-left font-semibold">Kategori</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Parameter</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Nilai</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Satuan</th>
          </tr>
        </thead>
        <tbody>
          {energyData.map((data) => (
            <tr key={data.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4.5 py-3.5">{data.category}</td>
              <td className="px-4.5 py-3.5">{data.parameter}</td>
              <td className="px-4.5 py-3.5">{data.value}</td>
              <td className="px-4.5 py-3.5">{data.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}