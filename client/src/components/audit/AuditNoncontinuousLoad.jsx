import { useState } from "react";
import { useAudit } from "../../context/AuditContext";

export default function AuditNoncontinuousLoad() {
  const { nonKontinuData, totalNonKontinuKWh, addNonKontinuItem } = useAudit();
  const [form, setForm] = useState({ peralatan: "", dayaKW: "", jamOperasi: "", hariKerja: 22 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.peralatan || !form.dayaKW || !form.jamOperasi) return;
    addNonKontinuItem({
      peralatan: form.peralatan,
      dayaKW: parseFloat(form.dayaKW),
      jamOperasi: parseFloat(form.jamOperasi),
      hariKerja: parseInt(form.hariKerja),
    });
    setForm({ peralatan: "", dayaKW: "", jamOperasi: "", hariKerja: 22 });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#244058]">Beban Nonkontinu</h1>
          <p className="text-xs text-gray-500 mt-1">
            Peralatan/Beban intermiten yang hanya beroperasi pada jam kerja
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Peralatan</label>
          <input
            type="text"
            placeholder="Contoh: Lampu Ruang Rapat"
            value={form.peralatan}
            onChange={(e) => setForm({ ...form, peralatan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <div className="w-28">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Daya (kW)</label>
          <input
            type="number"
            step="0.1"
            placeholder="0.0"
            value={form.dayaKW}
            onChange={(e) => setForm({ ...form, dayaKW: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <div className="w-28">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Jam/Hari</label>
          <input
            type="number"
            placeholder="8"
            value={form.jamOperasi}
            onChange={(e) => setForm({ ...form, jamOperasi: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <div className="w-28">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Hari/Bulan</label>
          <input
            type="number"
            value={form.hariKerja}
            onChange={(e) => setForm({ ...form, hariKerja: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <button type="submit" className="bg-[#244058] text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          + Tambah Beban
        </button>
      </form>

      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <thead className="bg-[#244058] text-white text-sm">
          <tr>
            <th className="px-5 py-3.5 text-left font-semibold">Nama Peralatan</th>
            <th className="px-5 py-3.5 text-left font-semibold">Daya (kW)</th>
            <th className="px-5 py-3.5 text-left font-semibold">Jam/Hari</th>
            <th className="px-5 py-3.5 text-left font-semibold">Hari/Bulan</th>
            <th className="px-5 py-3.5 text-left font-semibold">Total Konsumsi (kWh/Bulan)</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {nonKontinuData.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-5 py-3.5 font-medium text-gray-800">{item.peralatan}</td>
              <td className="px-5 py-3.5 text-gray-800">{item.dayaKW} kW</td>
              <td className="px-5 py-3.5 text-gray-800">{item.jamOperasi} Jam</td>
              <td className="px-5 py-3.5 text-gray-800">{item.hariKerja} Hari</td>
              <td className="px-5 py-3.5 font-semibold text-[#244058]">{item.totalKWh.toLocaleString()} kWh</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-bold text-sm text-[#244058]">
          <tr>
            <td colSpan="4" className="px-5 py-3.5 text-right">Total Beban Nonkontinu:</td>
            <td className="px-5 py-3.5 text-base">{totalNonKontinuKWh.toLocaleString()} kWh/Bulan</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}