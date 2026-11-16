import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function BuildingPage() {
  const [buildings] = useState([
    {
      id: 1,
      name: "Gedung Kerjasama PLN-ITB",
      city: "Bandung",
      address: "Jl. Ganesha No. 8, Coblong",
      type: "Perkantoran & Riset",
      area: 2000,
      floors: 2,
      auditStatus: "Aktif",
      previousAudit: null,
      performanceCategory: null,
      coordinates: { lat: -6.8894903, lng: 107.6106656 },
      mapsUrl:
        "https://www.google.com/maps/place/Gedung+Kerjasama+PLN-ITB/@-6.8894903,107.6106656,19z",
    },
    {
      id: 2,
      name: "Labtek V Benny Subianto ITB",
      city: "Bandung",
      address: "Jl. Ganesha No. 8, Coblong",
      type: "Laboratorium & Kelas",
      area: 3500,
      floors: 4,
      auditStatus: "Selesai",
      previousAudit: { period: "2024", category: "Boros" },
      performanceCategory: "Cukup Efisien",
      coordinates: { lat: -6.8905811, lng: 107.6097754 },
      mapsUrl:
        "https://www.google.com/maps/place/Labtek+V+Benny+Subianto/@-6.8905811,107.6097754,20z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [sortRules, setSortRules] = useState([]);

  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const getCategoryBadgeStyle = (category) => {
    if (category === "Efisien") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
    if (category === "Cukup Efisien") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }
    return "bg-rose-50 text-rose-700 border border-rose-200";
  };

  const getInlineBadgeStyle = (type, value) => {
    const baseStyle =
      "display: inline-block; padding: 1px 8px; border-radius: 9999px; font-size: 10px; font-weight: 600;";

    if (type === "status") {
      if (value === "Aktif") {
        return `${baseStyle} background-color: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;`;
      }
      return `${baseStyle} background-color: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;`;
    }

    if (type === "category") {
      if (value === "Efisien") {
        return `${baseStyle} background-color: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;`;
      }
      if (value === "Cukup Efisien") {
        return `${baseStyle} background-color: #fffbeb; color: #b45309; border: 1px solid #fde68a;`;
      }
      return `${baseStyle} background-color: #fff1f2; color: #be123c; border: 1px solid #fecdd3;`;
    }
    return baseStyle;
  };

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

  const filteredBuildings = buildings.filter((b) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    return (
      b.name.toLowerCase().includes(query) ||
      b.auditStatus.toLowerCase().includes(query) ||
      b.type.toLowerCase().includes(query) ||
      b.city.toLowerCase().includes(query) ||
      b.address.toLowerCase().includes(query) ||
      b.area.toString().includes(query) ||
      b.floors.toString().includes(query)
    );
  });

  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
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

  const totalBuildings = buildings.length;
  const activeAuditCount = buildings.filter((b) => b.auditStatus === "Aktif").length;
  const uniqueCities = new Set(buildings.map((b) => b.city)).size;

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

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const css = document.createElement("link");
      css.id = "leaflet-css";
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(css);
    }

    const initMap = () => {
      if (!window.L || !document.getElementById("map-container")) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = window.L.map("map-container");
      mapInstanceRef.current = map;

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      markersRef.current = {};

      if (sortedBuildings.length > 0) {
        const bounds = window.L.latLngBounds();

        sortedBuildings.forEach((b) => {
          const statusBadge = `<span style="${getInlineBadgeStyle("status", b.auditStatus)}">${b.auditStatus}</span>`;

          let performanceHtml = "";
          if (b.auditStatus === "Selesai" && b.performanceCategory) {
            const catBadge = `<span style="${getInlineBadgeStyle("category", b.performanceCategory)}">${b.performanceCategory}</span>`;
            performanceHtml = `<div style="margin-top: 5px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6b7280;"><span>Performa Energi:</span> ${catBadge}</div>`;
          } else if (b.auditStatus === "Aktif" && b.previousAudit) {
            const catBadge = `<span style="${getInlineBadgeStyle("category", b.previousAudit.category)}">${b.previousAudit.category}</span>`;
            performanceHtml = `<div style="margin-top: 5px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6b7280;"><span>Performa (${b.previousAudit.period}):</span> ${catBadge}</div>`;
          }

          const marker = window.L.marker([b.coordinates.lat, b.coordinates.lng])
            .addTo(map)
            .bindPopup(`
              <div style="font-family: sans-serif; padding: 2px; min-width: 190px;">
                <div style="margin-bottom: 5px;">
                  <strong style="color: #244058; font-size: 12px;">${b.name}</strong>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6b7280;">
                  <span>Status audit:</span>
                  ${statusBadge}
                </div>
                ${performanceHtml}
                <div style="font-size: 11px; color: #6b7280; margin-top: 5px;">
                  Alamat: ${b.address}
                </div>
              </div>
            `);

          marker.on("click", () => setSelectedBuilding(b));
          markersRef.current[b.id] = marker;
          bounds.extend([b.coordinates.lat, b.coordinates.lng]);
        });

        map.fitBounds(bounds, { padding: [40, 40] });
      } else {
        map.setView([-6.8900357, 107.6102205], 17);
      }
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [sortedBuildings]);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    if (selectedBuilding) {
      const { lat, lng } = selectedBuilding.coordinates;
      mapInstanceRef.current.setView([lat, lng], 18, { animate: true });
      const marker = markersRef.current[selectedBuilding.id];
      if (marker) marker.openPopup();
    }
  }, [selectedBuilding]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#244058]">Daftar Gedung</h1>
        <p className="text-xs text-gray-500 mt-1">
          Kelola profil gedung dan lokasi fasilitas terdaftar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Total Gedung
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {totalBuildings} <span className="text-sm font-normal text-gray-500">Unit</span>
          </span>
          <span className="text-xs text-gray-500 block mt-1">Fasilitas terintegrasi</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Audit Aktif
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {activeAuditCount} <span className="text-lg font-normal text-gray-400">/ {totalBuildings}</span>
          </span>
          <span className="text-xs text-emerald-600 font-medium block mt-1">
            Gedung sedang diaudit
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Kota Operasional
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {uniqueCities} <span className="text-sm font-normal text-gray-500">Kota</span>
          </span>
          <span className="text-xs text-gray-500 block mt-1">Bandung</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-[#244058]">Peta Lokasi Gedung</h3>
            <p className="text-xs text-gray-400">
              Menampilkan seluruh pin lokasi gedung terdaftar
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedBuilding(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedBuilding === null
                  ? "bg-[#244058] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌐 Semua Pin ({sortedBuildings.length})
            </button>
            {sortedBuildings.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBuilding(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedBuilding?.id === b.id
                    ? "bg-[#244058] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📍 {b.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gray-200 z-0">
          <div id="map-container" className="w-full h-full"></div>

          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 text-xs max-w-sm z-1000">
            {selectedBuilding ? (
              <>
                <div className="mb-1.5">
                  <span className="font-bold text-[#244058]">{selectedBuilding.name}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-gray-500">Status audit:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      selectedBuilding.auditStatus === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {selectedBuilding.auditStatus}
                  </span>
                </div>

                {selectedBuilding.auditStatus === "Selesai" && selectedBuilding.performanceCategory && (
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className="text-gray-500">Performa Energi:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getCategoryBadgeStyle(
                        selectedBuilding.performanceCategory
                      )}`}
                    >
                      {selectedBuilding.performanceCategory}
                    </span>
                  </div>
                )}

                {selectedBuilding.auditStatus === "Aktif" && selectedBuilding.previousAudit && (
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className="text-gray-500">
                      Performa ({selectedBuilding.previousAudit.period}):
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getCategoryBadgeStyle(
                        selectedBuilding.previousAudit.category
                      )}`}
                    >
                      {selectedBuilding.previousAudit.category}
                    </span>
                  </div>
                )}

                <div className="text-gray-500">Alamat: {selectedBuilding.address}</div>
                <a
                  href={selectedBuilding.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[11px] text-blue-600 font-semibold hover:underline"
                >
                  ↗ Buka dengan Google Maps
                </a>
              </>
            ) : (
              <div>
                <div className="font-bold text-[#244058]">
                  Menampilkan {sortedBuildings.length} Pin Gedung
                </div>
              </div>
            )}
          </div>
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
              placeholder="Cari Gedung"
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
            ✎ Edit Daftar Gedung
          </button>
          <button className="bg-[#244058] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            + Tambah Gedung
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#244058] text-white text-sm select-none">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Nama Gedung</span>
                  {renderSortIcon("name")}
                </div>
              </th>
              <th
                onClick={() => handleSort("auditStatus")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Status Audit</span>
                  {renderSortIcon("auditStatus")}
                </div>
              </th>
              <th
                onClick={() => handleSort("type")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Tipe Gedung</span>
                  {renderSortIcon("type")}
                </div>
              </th>
              <th
                onClick={() => handleSort("city")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Kota</span>
                  {renderSortIcon("city")}
                </div>
              </th>
              <th
                onClick={() => handleSort("address")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Alamat</span>
                  {renderSortIcon("address")}
                </div>
              </th>
              <th
                onClick={() => handleSort("area")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Luas</span>
                  {renderSortIcon("area")}
                </div>
              </th>
              <th
                onClick={() => handleSort("floors")}
                className="px-5 py-3.5 font-semibold cursor-pointer hover:bg-[#1d3347] transition"
              >
                <div className="flex items-center justify-between gap-1">
                  <span>Lantai</span>
                  {renderSortIcon("floors")}
                </div>
              </th>
              <th className="px-5 py-3.5 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedBuildings.length > 0 ? (
              sortedBuildings.map((building) => (
                <tr
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                    selectedBuilding?.id === building.id ? "bg-blue-50/50" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 font-semibold text-[#244058]">
                    {building.name}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        building.auditStatus === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {building.auditStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{building.type}</td>
                  <td className="px-5 py-3.5 text-gray-800">{building.city}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{building.address}</td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">
                    {building.area.toLocaleString()} m²
                  </td>
                  <td className="px-5 py-3.5 text-gray-800">{building.floors}</td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/audits?search=${encodeURIComponent(building.name)}`}
                      className="inline-block px-3 py-1.5 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-100 font-medium transition"
                    >
                      👁 Lihat Audit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-5 py-8 text-center text-gray-400 text-sm">
                  Tidak ada gedung yang cocok dengan kata kunci "<strong>{searchTerm}</strong>"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}