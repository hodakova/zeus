import "../styles/pages.css";

export default function BuildingPage() {
  const buildings = [
    {
      id: 1,
      name: "Gedung A",
      location: "Bandung",
      area: 2000,
    },
    {
      id: 2,
      name: "Gedung B",
      location: "Bandung",
      area: 3500,
    },
    {
      id: 3,
      name: "Gedung C",
      location: "Bandung",
      area: 1800,
    },
  ];

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Daftar Gedung
        </h1>

        <button className="primary-button">
          + Tambah Gedung
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nama Gedung</th>
            <th>Lokasi</th>
            <th>Luas (m²)</th>
          </tr>
        </thead>

        <tbody>
          {buildings.map((building) => (
            <tr key={building.id}>
              <td>{building.name}</td>
              <td>{building.location}</td>
              <td>{building.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}