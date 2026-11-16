import { useState, useMemo } from "react";
import { useAudit } from "../../context/AuditContext";

export default function AuditCompliance() {
  const {
    energyData = [],
    continuousData = [],
    noncontinuousData = [],
    annualIke = 0,
  } = useAudit() || {};

  const [selectedStandard, setSelectedStandard] = useState("ALL");

  const [manualChecks, setManualChecks] = useState({
    "iso50001-1": true,
    "iso50001-2": true,
    "iso50001-3": false,
    "iso50002-3": true,
    "iso50002-5": true,
    "sni6196-1": true,
    "tech-2": false,
  });

  const [auditorNotes, setAuditorNotes] = useState({
    "iso50001-3": "Dokumen tinjauan manajemen triwulan masih dalam proses tanda tangan.",
    "tech-2": "Beberapa ruang kerja terpantau diset pada suhu 21°C.",
  });

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState("");

  const lightingLuxParam = energyData.find((d) =>
    d.parameter?.toLowerCase().includes("pencahayaan")
  );
  const powerFactorParam = energyData.find((d) =>
    d.parameter?.toLowerCase().includes("faktor daya")
  );

  const lightingLoads = [...continuousData, ...noncontinuousData].filter(
    (item) =>
      item.equipment?.toLowerCase().includes("pencahayaan") ||
      item.equipment?.toLowerCase().includes("penerangan") ||
      item.equipment?.toLowerCase().includes("lampu")
  );
  const totalLightingWatts =
    lightingLoads.reduce((sum, item) => sum + (item.powerKW || 0), 0) * 1000;
  const buildingArea = 2000;
  const lightingPowerDensity = Number((totalLightingWatts / buildingArea).toFixed(2));

  const complianceCriteria = useMemo(() => {
    const luxVal = lightingLuxParam ? Number(lightingLuxParam.value) : 0;
    const pfVal = powerFactorParam ? Number(powerFactorParam.value) : 0;
    const hasEnergyData = energyData.length > 0;
    const hasLoadData = continuousData.length > 0 && noncontinuousData.length > 0;

    return [
      {
        id: "iso50001-1",
        standard: "ISO 50001:2011",
        requirement: "Kebijakan Energi Organisasi",
        description: "Tersedia kebijakan energi tertulis yang disahkan oleh manajemen puncak gedung.",
        checkType: "manual",
        isMet: !!manualChecks["iso50001-1"],
        actualValue: "Dokumen Kebijakan v2.1",
        targetValue: "Tersedia & Disahkan",
      },
      {
        id: "iso50001-2",
        standard: "ISO 50001:2011",
        requirement: "Penetapan Baseline & Target Energi (EnPI)",
        description: "Baseline konsumsi energi dan indikator kinerja energi tahunan telah ditetapkan.",
        checkType: "manual",
        isMet: !!manualChecks["iso50001-2"],
        actualValue: "EnPI Terdokumentasi",
        targetValue: "Terdokumentasi",
      },
      {
        id: "iso50001-3",
        standard: "ISO 50001:2011",
        requirement: "Tinjauan Manajemen & Audit Internal Berkala",
        description: "Evaluasi berkala terhadap efektivitas sistem manajemen energi.",
        checkType: "manual",
        isMet: !!manualChecks["iso50001-3"],
        actualValue: "Menunggu Pengesahan",
        targetValue: "Dilaksanakan Minimal 1x/Tahun",
      },

      {
        id: "iso50002-1",
        standard: "ISO 50002:2014",
        requirement: "Pengumpulan Data Historis & Profil Energi",
        description: "Data parameter kelistrikan utama gedung telah diinput ke dalam sistem.",
        checkType: "auto",
        isMet: hasEnergyData,
        actualValue: `${energyData.length} Parameter Terdata`,
        targetValue: "Minimal 1 Parameter",
      },
      {
        id: "iso50002-2",
        standard: "ISO 50002:2014",
        requirement: "Inventarisasi & Pemilahan Beban Energi",
        description: "Seluruh beban kelistrikan telah dipisahkan ke dalam beban kontinu dan nonkontinu.",
        checkType: "auto",
        isMet: hasLoadData,
        actualValue: `${continuousData.length + noncontinuousData.length} Unit Beban`,
        targetValue: "Kontinu & Nonkontinu Terisi",
      },
      {
        id: "iso50002-3",
        standard: "ISO 50002:2014",
        requirement: "Verifikasi Pengukuran Lapangan (On-Site Measurement)",
        description: "Kalibrasi alat ukur dan pencatatan daya aktual dilakukan langsung di panel/ruangan.",
        checkType: "manual",
        isMet: !!manualChecks["iso50002-3"],
        actualValue: "Terverifikasi Power Analyzer",
        targetValue: "Verifikasi Lapangan",
      },

      {
        id: "sni6196-1",
        standard: "SNI 03-6196-2000",
        requirement: "Audit Energi Awal & Rinci Berdasarkan Luas Gedung",
        description: "Perhitungan luas area terkondisi dan tidak terkondisi telah diverifikasi sesuai denah.",
        checkType: "manual",
        isMet: !!manualChecks["sni6196-1"],
        actualValue: `${buildingArea.toLocaleString()} m²`,
        targetValue: "Sesuai Denah Aktual",
      },
      {
        id: "sni6196-2",
        standard: "SNI 03-6196-2000",
        requirement: "Ambang Batas Intensitas Konsumsi Energi (IKE)",
        description: "Nilai IKE tahunan gedung memenuhi kategori Efisien sesuai standar bangunan perkantoran/pendidikan.",
        checkType: "auto",
        isMet: annualIke > 0 && annualIke <= 185,
        actualValue: `${annualIke} kWh/m²/thn`,
        targetValue: "≤ 185 kWh/m²/thn",
      },

      {
        id: "tech-1",
        standard: "Standar Teknis Sistem",
        requirement: "Intensitas Pencahayaan Ruangan (SNI 03-6197-2000)",
        description: "Tingkat iluminasi ruang kerja/kelas memenuhi standar kenyamanan visual minimal.",
        checkType: "auto",
        isMet: luxVal >= 300,
        actualValue: `${luxVal} lux`,
        targetValue: "≥ 300 lux",
      },
      {
        id: "tech-2",
        standard: "Standar Teknis Sistem",
        requirement: "Temperatur Setpoint Sistem Tata Udara / HVAC (SNI 03-6390-2000)",
        description: "Pengaturan suhu ruangan AC berada pada rentang konservasi energi yang direkomendasikan.",
        checkType: "manual",
        isMet: !!manualChecks["tech-2"],
        actualValue: manualChecks["tech-2"] ? "24°C - 25°C" : "Terpantau < 24°C",
        targetValue: "24°C - 25°C",
      },
      {
        id: "tech-3",
        standard: "Standar Teknis Sistem",
        requirement: "Densitas Daya Pencahayaan per Luas Area (LPD)",
        description: "Beban daya pencahayaan terpasang per meter persegi tidak melebihi batas maksimal SNI.",
        checkType: "auto",
        isMet: lightingPowerDensity <= 15,
        actualValue: `${lightingPowerDensity} W/m²`,
        targetValue: "≤ 15 W/m²",
      },
      {
        id: "tech-4",
        standard: "Standar Teknis Sistem",
        requirement: "Kualitas Faktor Daya Listrik (cos φ - PUIL / PLN)",
        description: "Faktor daya sistem kelistrikan gedung berada di atas batas minimum penalti daya reaktif.",
        checkType: "auto",
        isMet: pfVal >= 0.85,
        actualValue: `${pfVal}`,
        targetValue: "≥ 0.85",
      },
    ];
  }, [
    energyData,
    continuousData,
    noncontinuousData,
    annualIke,
    lightingLuxParam,
    powerFactorParam,
    lightingPowerDensity,
    manualChecks,
  ]);

  const toggleManualCheck = (id) => {
    setManualChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenNoteEditor = (id) => {
    setEditingNoteId(id);
    setTempNote(auditorNotes[id] || "");
  };

  const handleSaveNote = (id) => {
    setAuditorNotes((prev) => ({
      ...prev,
      [id]: tempNote.trim(),
    }));
    setEditingNoteId(null);
  };

  const totalCount = complianceCriteria.length;
  const metCount = complianceCriteria.filter((c) => c.isMet).length;
  const compliancePercentage = Math.round((metCount / totalCount) * 100);
  const autoCheckCount = complianceCriteria.filter((c) => c.checkType === "auto").length;
  const manualCheckCount = complianceCriteria.filter((c) => c.checkType === "manual").length;

  const standardTabs = [
    { id: "ALL", label: "Semua Standar" },
    { id: "ISO 50001:2011", label: "ISO 50001:2011" },
    { id: "ISO 50002:2014", label: "ISO 50002:2014" },
    { id: "SNI 03-6196-2000", label: "SNI 03-6196-2000" },
    { id: "Standar Teknis Sistem", label: "Standar Teknis (SNI & PUIL)" },
  ];

  const displayedCriteria =
    selectedStandard === "ALL"
      ? complianceCriteria
      : complianceCriteria.filter((c) => c.standard === selectedStandard);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#244058]">Kepatuhan Standar Audit Energi</h1>
        <p className="text-xs text-gray-500 mt-1">
          Evaluasi otomatis berbasis parameter terukur dan verifikasi manual lapangan oleh auditor
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Tingkat Kepatuhan
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#244058]">{compliancePercentage}%</span>
            <span className="text-xs font-medium text-gray-500">
              ({metCount} dari {totalCount} syarat)
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className={`h-full transition-all duration-500 ${
                compliancePercentage >= 80
                  ? "bg-emerald-500"
                  : compliancePercentage >= 60
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
              style={{ width: `${compliancePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Pengecekan Otomatis Sistem
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {complianceCriteria.filter((c) => c.checkType === "auto" && c.isMet).length}{" "}
            <span className="text-lg font-normal text-gray-400">/ {autoCheckCount}</span>
          </span>
          <span className="text-xs text-blue-600 font-medium block mt-1">
            Terhitung langsung dari data energi &amp; beban
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Verifikasi Manual Auditor
          </span>
          <span className="text-3xl font-bold text-[#244058]">
            {complianceCriteria.filter((c) => c.checkType === "manual" && c.isMet).length}{" "}
            <span className="text-lg font-normal text-gray-400">/ {manualCheckCount}</span>
          </span>
          <span className="text-xs text-emerald-600 font-medium block mt-1">
            Inspeksi dokumen &amp; kondisi lapangan
          </span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        {standardTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStandard(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedStandard === tab.id
                ? "bg-[#244058] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {displayedCriteria.map((item) => (
          <div
            key={item.id}
            className={`bg-white p-4.5 rounded-xl border transition shadow-sm ${
              item.isMet ? "border-gray-100" : "border-amber-200 bg-amber-50/20"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                {item.checkType === "manual" ? (
                  <input
                    type="checkbox"
                    checked={item.isMet}
                    onChange={() => toggleManualCheck(item.id)}
                    className="mt-1 w-4.5 h-4.5 rounded border-gray-300 text-[#244058] focus:ring-[#244058] cursor-pointer"
                    title="Klik untuk verifikasi manual"
                  />
                ) : (
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      item.isMet
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                    title="Dievaluasi otomatis oleh sistem"
                  >
                    {item.isMet ? "✓" : "!"}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {item.standard}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.checkType === "auto"
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {item.checkType === "auto" ? "⚙ Auto-Check" : "✍ Verifikasi Manual"}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#244058] mt-1.5">
                    {item.requirement}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>

                  {auditorNotes[item.id] && editingNoteId !== item.id && (
                    <div className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700">
                      <span className="font-semibold text-[#244058]">Catatan Auditor:</span>{" "}
                      {auditorNotes[item.id]}
                    </div>
                  )}

                  {editingNoteId === item.id && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="Tambahkan catatan bukti lapangan..."
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#244058]"
                      />
                      <button
                        onClick={() => handleSaveNote(item.id)}
                        className="bg-[#244058] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.isMet
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {item.isMet ? "Terpenuhi" : "Belum Terpenuhi"}
                </span>

                <div className="text-right text-xs">
                  <div className="text-gray-800 font-semibold">
                    Aktual: <span className="text-[#244058]">{item.actualValue}</span>
                  </div>
                  <div className="text-gray-400 text-[11px]">Target: {item.targetValue}</div>
                </div>

                {editingNoteId !== item.id && (
                  <button
                    onClick={() => handleOpenNoteEditor(item.id)}
                    className="text-[11px] text-gray-500 hover:text-[#244058] font-medium underline"
                  >
                    {auditorNotes[item.id] ? "✎ Edit Catatan" : "+ Tambah Catatan"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}