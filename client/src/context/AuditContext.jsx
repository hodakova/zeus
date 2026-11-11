import { createContext, useContext, useState } from "react";

const AuditContext = createContext();

export function AuditProvider({ children }) {
  const [energyData, setEnergyData] = useState([
    { id: 1, category: "Konsumsi Energi", parameter: "Total Konsumsi Energi", value: 12000, unit: "kWh" },
    { id: 2, category: "HVAC", parameter: "Daya Aktual AC", value: 15, unit: "kW" },
    { id: 3, category: "Pencahayaan", parameter: "Intensitas Pencahayaan", value: 350, unit: "lux" },
    { id: 4, category: "Faktor Daya", parameter: "Faktor Daya", value: 0.92, unit: "-" },
  ]);

  const [continuousData, setContinuousData] = useState([
    { id: 1, equipment: "Server Room AC & UPS", powerKW: 4.5, operatingHours: 24, totalKWh: 3240 },
    { id: 2, equipment: "Penerangan Darurat & Koridor", powerKW: 2.0, operatingHours: 24, totalKWh: 1440 },
    { id: 3, equipment: "Pompa Sirkulasi Utama", powerKW: 3.0, operatingHours: 24, totalKWh: 2160 },
  ]);

  const [noncontinuousData, setNoncontinuousData] = useState([
    { id: 1, equipment: "AC Split Ruang Kerja", powerKW: 12.0, operatingHours: 9, workingDays: 22, totalKWh: 2376 },
    { id: 2, equipment: "Pencahayaan Ruang Kantor", powerKW: 5.5, operatingHours: 10, workingDays: 22, totalKWh: 1210 },
    { id: 3, equipment: "Komputer & Peralatan Kantor", powerKW: 8.0, operatingHours: 8, workingDays: 22, totalKWh: 1408 },
    { id: 4, equipment: "Lift Penumpang", powerKW: 7.5, operatingHours: 6, workingDays: 22, totalKWh: 990 },
  ]);

  const totalContinuousKWh = continuousData.reduce((acc, curr) => acc + curr.totalKWh, 0);
  const totalNoncontinuousKWh = noncontinuousData.reduce((acc, curr) => acc + curr.totalKWh, 0);
  const totalMonthlyConsumptionKWh = totalContinuousKWh + totalNoncontinuousKWh;
  
  const buildingArea = 2000;
  const annualIke = Math.round(((totalMonthlyConsumptionKWh * 12) / buildingArea));
  const ikeCategory = annualIke <= 185 ? "Efisien" : annualIke <= 250 ? "Cukup Efisien" : "Boros";

  const addContinuousItem = (newItem) => {
    const itemWithTotal = { ...newItem, totalKWh: newItem.powerKW * newItem.operatingHours * 30 };
    setContinuousData([...continuousData, { ...itemWithTotal, id: Date.now() }]);
  };

  const addNoncontinuousItem = (newItem) => {
    const itemWithTotal = { ...newItem, totalKWh: newItem.powerKW * newItem.operatingHours * newItem.workingDays };
    setNoncontinuousData([...noncontinuousData, { ...itemWithTotal, id: Date.now() }]);
  };

  return (
    <AuditContext.Provider
      value={{
        energyData,
        continuousData,
        noncontinuousData,
        totalContinuousKWh,
        totalNoncontinuousKWh,
        totalMonthlyConsumptionKWh,
        annualIke,
        ikeCategory,
        addContinuousItem,
        addNoncontinuousItem,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export const useAudit = () => useContext(AuditContext);