import { useState } from "react";
import { useAudit } from "../../context/AuditContext";

export default function AuditEnergy() {
  const { energyData } = useAudit();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortRules, setSortRules] = useState([]);

  const handleSort = (key) => {
    setSortRules((prevRules) => {
      const existingIndex = prevRules.findIndex((r) => r.key === key);

      if (existingIndex !== -1) {
        const existingRule = prevRules[existingIndex];
        if (existingRule.direction === "asc") {
          const updatedRule = { key, direction: "desc" };
          const remainingRules = prevRules.filter((r) => r.key !== key);
          return [updatedRule, ...remainingRules];
        } else {
          return prevRules.filter((r) => r.key !== key);
        }
      } else {
        return [{ key, direction: "asc" }, ...prevRules];
      }
    });
  };

  const handleResetSort = () => {
    setSortRules([]);
  };

  const filteredEnergyData = energyData.filter((item) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    return (
      item.category.toLowerCase().includes(query) ||
      item.parameter.toLowerCase().includes(query) ||
      item.value.toString().includes(query) ||
      item.unit.toLowerCase().includes(query)
    );
  });

  const sortedEnergyData = [...filteredEnergyData].sort((a, b) => {
    for (const rule of sortRules) {
      const { key, direction } = rule;
      const aVal = a[key];
      const bVal = b[key];

      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) comparison = -1;
        if (aStr > bStr) comparison = 1;
      }

      if (comparison !== 0) {
        return direction === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });

  const renderSortIcon = (key) => {
    const ruleIndex = sortRules.findIndex((r) => r.key === key);
    if (ruleIndex === -1) {
      return <span className="text-gray-400/60 text-[10px] ml-1">▲▼</span>;
    }
    const rule = sortRules[ruleIndex];
    return (
      <span className="inline-flex items-center gap-0.5 text-emerald-400 font-bold text-[10px] ml-1">
        {rule.direction === "asc" ? "▲" : "▼"}
        {sortRules.length > 1 && (
          <span className="text-[9px] bg-emerald-500/30 text-emerald-200 px-1 rounded-full font-mono">
            {ruleIndex + 1}
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#244058]">Data Energi</h1>
        <p className="text-xs text-gray-500 mt-1">
          Parameter dasar dan konsumsi energi gedung
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari Data"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {sortRules.length > 0 && (
            <button
              onClick={handleResetSort}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap"
              title="Kembalikan urutan tabel ke normal"
            >
              🔄 Reset Urutan
            </button>
          )}
        </div>

        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            ✎ Edit Data
          </button>
          <button className="bg-[#244058] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            + Tambah Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#244058] text-white text-sm select-none">
            <tr>
              <th
                onClick={() => handleSort("category")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Kategori</span>
                  {renderSortIcon("category")}
                </div>
              </th>
              <th
                onClick={() => handleSort("parameter")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Parameter</span>
                  {renderSortIcon("parameter")}
                </div>
              </th>
              <th
                onClick={() => handleSort("value")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Nilai</span>
                  {renderSortIcon("value")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedEnergyData.length > 0 ? (
              sortedEnergyData.map((data) => (
                <tr key={data.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{data.category}</td>
                  <td className="px-5 py-3.5 text-gray-600">{data.parameter}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#244058]">
                    {data.value} {data.unit !== "-" ? data.unit : ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-5 py-8 text-center text-gray-400 text-sm">
                  Tidak ada data yang cocok dengan kata kunci "<strong>{searchTerm}</strong>"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}