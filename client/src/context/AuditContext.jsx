import { createContext, useContext, useState } from "react";

const AuditContext = createContext();

export function AuditProvider({ children }) {
  const [energyData, setEnergyData] = useState([
    { id: 1, kategori: "Konsumsi Energi", parameter: "Total Konsumsi Energi", nilai: 12000, satuan: "kWh" },
    { id: 2, kategori: "HVAC", parameter: "Daya Aktual AC", nilai: 15, satuan: "kW" },
    { id: 3, kategori: "Pencahayaan", parameter: "Intensitas Pencahayaan", nilai: 350, satuan: "lux" },
    { id: 4, kategori: "Faktor Daya", parameter: "Faktor Daya", nilai: 0.92, satuan: "-" },
  ]);

  const [kontinuData, setKontinuData] = useState([
    { id: 1, peralatan: "Server Room AC & UPS", dayaKW: 4.5, jamOperasi: 24, totalKWh: 3240 },
    { id: 2, peralatan: "Penerangan Darurat & Koridor", dayaKW: 2.0, jamOperasi: 24, totalKWh: 1440 },
    { id: 3, peralatan: "Pompa Sirkulasi Utama", dayaKW: 3.0, jamOperasi: 24, totalKWh: 2160 },
  ]);

  const [nonKontinuData, setNonKontinuData] = useState([
    { id: 1, peralatan: "AC Split Ruang Kerja", dayaKW: 12.0, jamOperasi: 9, hariKerja: 22, totalKWh: 2376 },
    { id: 2, peralatan: "Pencahayaan Ruang Kantor", dayaKW: 5.5, jamOperasi: 10, hariKerja: 22, totalKWh: 1210 },
    { id: 3, peralatan: "Komputer & Peralatan Kantor", dayaKW: 8.0, jamOperasi: 8, hariKerja: 22, totalKWh: 1408 },
    { id: 4, peralatan: "Lift Penumpang", dayaKW: 7.5, jamOperasi: 6, hariKerja: 22, totalKWh: 990 },
  ]);

  const totalKontinuKWh = kontinuData.reduce((acc, curr) => acc + curr.totalKWh, 0);
  const totalNonKontinuKWh = nonKontinuData.reduce((acc, curr) => acc + curr.totalKWh, 0);
  const totalKonsumsiBulanKWh = totalKontinuKWh + totalNonKontinuKWh;
  
  const luasGedung = 2000;
  const ikeTahunan = Math.round(((totalKonsumsiBulanKWh * 12) / luasGedung));
  const kategoriIKE = ikeTahunan <= 185 ? "Efisien" : ikeTahunan <= 250 ? "Cukup Efisien" : "Boros";

  const addKontinuItem = (newItem) => {
    const itemWithTotal = { ...newItem, totalKWh: newItem.dayaKW * newItem.jamOperasi * 30 };
    setKontinuData([...kontinuData, { ...itemWithTotal, id: Date.now() }]);
  };

  const addNonKontinuItem = (newItem) => {
    const itemWithTotal = { ...newItem, totalKWh: newItem.dayaKW * newItem.jamOperasi * newItem.hariKerja };
    setNonKontinuData([...nonKontinuData, { ...itemWithTotal, id: Date.now() }]);
  };

  return (
    <AuditContext.Provider
      value={{
        energyData,
        kontinuData,
        nonKontinuData,
        totalKontinuKWh,
        totalNonKontinuKWh,
        totalKonsumsiBulanKWh,
        ikeTahunan,
        kategoriIKE,
        addKontinuItem,
        addNonKontinuItem,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export const useAudit = () => useContext(AuditContext);