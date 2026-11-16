import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function AuditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) {
      setSearchTerm(querySearch);
    }
  }, [searchParams]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({}, { replace: true });
  };

  const [audits] = useState([
    {
      id: 1,
      building: "Gedung Kerjasama PLN-ITB",
      period: "2026",
      auditor: "Asep, S.T.",
      ikeValue: 172,
      ikeCategory: "Efisien",
      status: "Aktif",
    },
    {
      id: 2,
      building: "Labtek V Benny Subianto ITB",
      period: "2025",
      auditor: "Dudung, S.T.",
      ikeValue: 210,
      ikeCategory: "Cukup Efisien",
      status: "Selesai",
    },
  ]);

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

  const filteredAudits = audits.filter((a) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    return (
      a.building.toLowerCase().includes(query) ||
      a.period.toString().includes(query) ||
      a.auditor.toLowerCase().includes(query) ||
      a.ikeValue.toString().includes(query) ||
      a.ikeCategory.toLowerCase().includes(query) ||
      a.status.toLowerCase().includes(query)
    );
  });

  const sortedAudits = [...filteredAudits].sort((a, b) => {
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

  const totalAudits = audits.length;
  const activeAuditsCount = audits.filter((a) => a.status === "Aktif").length;
  const completedAuditsCount = audits.filter((a) => a.status === "Selesai").length;

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#244058]">Daftar Audit</h1>
        <p className="text-xs text-gray-500 mt-1">
          Kelola proyek dan riwayat pelaksanaan audit energi gedung
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Total Audit
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {totalAudits} <span className="text-sm font-normal text-gray-500">Proyek</span>
          </span>
          <span className="text-xs text-gray-500 block mt-1">Seluruh riwayat audit</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Audit Aktif
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {activeAuditsCount} <span className="text-sm font-normal text-gray-500">Proyek</span>
          </span>
          <span className="text-xs text-emerald-600 font-medium block mt-1">
            Sedang dalam proses
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Audit Selesai
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {completedAuditsCount} <span className="text-sm font-normal text-gray-500">Proyek</span>
          </span>
          <span className="text-xs text-blue-600 font-medium block mt-1">
            Laporan telah diterbitkan
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari Audit"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#244058]"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
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
          <button className="bg-[#244058] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            + Audit Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#244058] text-white text-sm select-none">
            <tr>
              <th
                onClick={() => handleSort("building")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Nama Gedung</span>
                  {renderSortIcon("building")}
                </div>
              </th>
              <th
                onClick={() => handleSort("period")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Periode</span>
                  {renderSortIcon("period")}
                </div>
              </th>
              <th
                onClick={() => handleSort("auditor")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Auditor</span>
                  {renderSortIcon("auditor")}
                </div>
              </th>
              <th
                onClick={() => handleSort("ikeValue")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Nilai IKE</span>
                  {renderSortIcon("ikeValue")}
                </div>
              </th>
              <th
                onClick={() => handleSort("ikeCategory")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Kategori IKE</span>
                  {renderSortIcon("ikeCategory")}
                </div>
              </th>
              <th
                onClick={() => handleSort("status")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Status Audit</span>
                  {renderSortIcon("status")}
                </div>
              </th>
              <th className="px-5 py-3.5 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedAudits.length > 0 ? (
              sortedAudits.map((audit) => (
                <tr
                  key={audit.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3.5 font-semibold text-[#244058]">
                    {audit.building}
                  </td>
                  <td className="px-5 py-3.5 text-gray-800">{audit.period}</td>
                  <td className="px-5 py-3.5 text-gray-600">{audit.auditor}</td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">
                    {audit.ikeValue} <span className="text-xs text-gray-400 font-normal">kWh/m²/thn</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        audit.ikeCategory === "Efisien"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : audit.ikeCategory === "Cukup Efisien"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {audit.ikeCategory}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        audit.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/audits/${audit.id}`}
                      className="inline-block px-3 py-1.5 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-100 font-medium transition"
                    >
                      👁 Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-5 py-8 text-center text-gray-400 text-sm">
                  Tidak ada audit yang cocok dengan kata kunci "<strong>{searchTerm}</strong>"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}