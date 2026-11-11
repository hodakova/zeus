export default function BuildingPage() {
  const buildings = [
    { id: 1, name: "Gedung A", location: "Bandung", area: 2000 },
    { id: 2, name: "Gedung B", location: "Bandung", area: 3500 },
    { id: 3, name: "Gedung C", location: "Bandung", area: 1800 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244058]">
          Daftar Gedung
        </h1>
        <div className="flex gap-3">
          <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
            Edit Daftar Gedung
          </button>
          <button className="bg-[#244058] text-white rounded-lg px-4.5 py-2.5 font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="text-xs font-bold">+</span>
            Tambah Gedung
          </button>
        </div>
      </div>
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <thead className="bg-[#244058] text-white">
          <tr>
            <th className="px-4.5 py-3.5 text-left font-semibold">Nama Gedung</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Lokasi</th>
            <th className="px-4.5 py-3.5 text-left font-semibold">Luas (m²)</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building) => (
            <tr key={building.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4.5 py-3.5">{building.name}</td>
              <td className="px-4.5 py-3.5">{building.location}</td>
              <td className="px-4.5 py-3.5">{building.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}