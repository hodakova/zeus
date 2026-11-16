import { useEffect, useRef } from "react";

export default function AuditOverview() {
  const mapInstanceRef = useRef(null);

  const buildingInfo = {
    name: "Gedung Kerjasama PLN-ITB",
    city: "Bandung",
    address: "Jl. Ganesha No. 8, Coblong",
    type: "Perkantoran & Riset",
    area: 2000,
    floors: 2,
    coordinates: { lat: -6.8894903, lng: 107.6106656 },
    mapsUrl:
      "https://www.google.com/maps/place/Gedung+Kerjasama+PLN-ITB/@-6.8894903,107.6106656,19z",
  };

  const auditInfo = {
    name: "Audit Energi Kelistrikan Gedung PLN Periode 2026",
    status: "Aktif",
    period: "2026",
    date: "6 Agustus 2026",
    auditor: "Asep",
    standards: "SNI 03-6196-2000, ISO 50001, & ISO 50002",
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
      if (!window.L || !document.getElementById("audit-overview-map")) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const { lat, lng } = buildingInfo.coordinates;
      const map = window.L.map("audit-overview-map").setView([lat, lng], 18);
      mapInstanceRef.current = map;

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      window.L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 2px;">
            <strong style="color: #244058; font-size: 13px;">${buildingInfo.name}</strong><br/>
            <span style="font-size: 11px; color: #666;">${buildingInfo.address}</span>
          </div>
        `)
        .openPopup();
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
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Nilai IKE Saat Ini
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#244058]">172</span>
            <span className="text-xs text-gray-500 font-medium">kWh/m²/thn</span>
          </div>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Efisien
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Total Konsumsi Energi
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#244058]">28,667</span>
            <span className="text-xs text-gray-500 font-medium">kWh/Bulan</span>
          </div>
          <span className="text-xs text-gray-500 block mt-2">
            Beban Kontinu + Nonkontinu
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Potensi Penghematan
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">12.5%</span>
            <span className="text-xs text-gray-500 font-medium">~3,580 kWh</span>
          </div>
          <span className="text-xs text-emerald-600 font-medium block mt-2">
            Rekomendasi Retrofit
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Kepatuhan Standar
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#244058]">83%</span>
            <span className="text-xs text-gray-500 font-medium">(15/18 Kriteria)</span>
          </div>
          <span className="text-xs text-blue-600 font-medium block mt-2">
            Sesuai SNI 03-6196-2000, ISO 50001, & ISO 50002
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-[#244058] font-bold text-base border-b border-gray-100 pb-2">
            Informasi Audit
          </h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Nama Audit</span>
              <span className="font-semibold text-gray-800">{auditInfo.name}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2 items-center">
              <span className="text-gray-500 font-medium">Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {auditInfo.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Periode</span>
              <span className="text-gray-800 font-medium">{auditInfo.period}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Tgl Pelaksanaan</span>
              <span className="text-gray-800 font-medium">{auditInfo.date}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Auditor Utama</span>
              <span className="text-gray-800 font-semibold">{auditInfo.auditor}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Acuan Standar</span>
              <span className="text-gray-700 font-medium">{auditInfo.standards}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-[#244058] font-bold text-base border-b border-gray-100 pb-2">
            Profil Gedung Audit
          </h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Nama Gedung</span>
              <span className="font-semibold text-[#244058]">{buildingInfo.name}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Tipe Gedung</span>
              <span className="text-gray-800 font-medium">{buildingInfo.type}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Kota</span>
              <span className="text-gray-800 font-medium">{buildingInfo.city}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Alamat</span>
              <span className="text-gray-800 font-medium">{buildingInfo.address}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Luas Total</span>
              <span className="text-gray-800 font-medium">{buildingInfo.area.toLocaleString()} m²</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <span className="text-gray-500 font-medium">Jumlah Lantai</span>
              <span className="text-gray-800 font-medium">{buildingInfo.floors} Lantai</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-[#244058] font-bold text-base">Peta Lokasi Gedung</h3>
            <p className="text-xs text-gray-400 mb-3">{buildingInfo.address}</p>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 z-0">
              <div id="audit-overview-map" className="w-full h-full"></div>
            </div>
          </div>
          <a
            href={buildingInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            ↗ Buka dengan Google Maps
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#244058] mb-4">
          Progres Tahapan Audit Energi
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">Tahap 1</span>
            <span className="text-xs font-semibold text-emerald-900 block mt-0.5">Data Energi</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Selesai ✓</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">Tahap 2</span>
            <span className="text-xs font-semibold text-emerald-900 block mt-0.5">Beban Kontinu</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Selesai ✓</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <span className="text-[10px] font-bold text-amber-700 block uppercase">Tahap 3</span>
            <span className="text-xs font-semibold text-amber-900 block mt-0.5">Beban Nonkontinu</span>
            <span className="text-[11px] text-amber-600 block mt-1">Sedang Proses ⏳</span>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg opacity-60">
            <span className="text-[10px] font-bold text-gray-500 block uppercase">Tahap 4</span>
            <span className="text-xs font-semibold text-gray-700 block mt-0.5">Kepatuhan SNI</span>
            <span className="text-[11px] text-gray-400 block mt-1">Belum Mulai</span>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg opacity-60">
            <span className="text-[10px] font-bold text-gray-500 block uppercase">Tahap 5</span>
            <span className="text-xs font-semibold text-gray-700 block mt-0.5">Laporan Final</span>
            <span className="text-[11px] text-gray-400 block mt-1">Belum Mulai</span>
          </div>
        </div>
      </div>
    </div>
  );
}