export default function AuditEnergy({ auditEnergyData  }) {
  return (
    <>
      <div className="audit-section-header">
        <h2 className="audit-section-title">
          Data Energi
        </h2>

        <button className="primary-button">
          + Tambah Data
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Parameter</th>
            <th>Nilai</th>
            <th>Satuan</th>
          </tr>
        </thead>

        <tbody>
          {auditEnergyData.map((data) => (
            <tr key={data.id}>
              <td>{data.kategori}</td>
              <td>{data.parameter}</td>
              <td>{data.nilai}</td>
              <td>{data.satuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}