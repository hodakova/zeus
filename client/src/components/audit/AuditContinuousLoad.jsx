import { useState } from "react";
import { useAudit } from "../../context/AuditContext";

export default function AuditContinuousLoad() {
  const { kontinuData, totalKontinuKWh, addKontinuItem } = useAudit();
  const [form, setForm] = useState({ peralatan: "", dayaKW: "", jamOperasi: 24 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.peralatan || !form.dayaKW) return;
    addKontinuItem({
      peralatan: form.peralatan,
      dayaKW: parseFloat(form.dayaKW),
      jamOperasi: 24,
    });
    setForm({ peralatan: "", dayaKW: "", jamOperasi: 24 });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#244058]">Beban Kontinu</h1>
          <p className="text-xs text-gray-500 mt-1">
            Peralatan/Beban yang beroperasi non-stop 24 Jam/Hari (30 Hari/Bulan)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Peralatan / Sistem</label>
          <input
            type="text"
            placeholder="Contoh: Server & UPS"
            value={form.peralatan}
            onChange={(e) => setForm({ ...form, peralatan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <div className="w-36">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Daya Aktual (kW)</label>
          <input
            type="number"
            step="0.1"
            placeholder="0.0"
            value={form.dayaKW}
            onChange={(e) => setForm({ ...form, dayaKW: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
          />
        </div>
        <div className="w-36">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Jam/Hari</label>
          <input
            type="number"
            disabled
            value={24}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600"
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
            <th className="px-5 py-3.5 text-left font-semibold">Jam Operasi/Hari</th>
            <th className="px-5 py-3.5 text-left font-semibold">Total Konsumsi (kWh/Bulan)</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {kontinuData.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-5 py-3.5 font-medium text-gray-800">{item.peralatan}</td>
              <td className="px-5 py-3.5 text-gray-800">{item.dayaKW} kW</td>
              <td className="px-5 py-3.5 text-gray-800">{item.jamOperasi} Jam</td>
              <td className="px-5 py-3.5 font-semibold text-[#244058]">{item.totalKWh.toLocaleString()} kWh</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-bold text-sm text-[#244058]">
          <tr>
            <td colSpan="3" className="px-5 py-3.5 text-right">Total Beban Kontinu:</td>
            <td className="px-5 py-3.5 text-base">{totalKontinuKWh.toLocaleString()} kWh/Bulan</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}