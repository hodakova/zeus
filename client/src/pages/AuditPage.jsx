import { Link } from "react-router-dom";
import "../styles/pages.css";

export default function AuditPage() {
  const audits = [
    {
      id: 1,
      building: "Gedung A",
      period: "2025",
      status: "Selesai",
    },
    {
      id: 2,
      building: "Gedung B",
      period: "2026",
      status: "Aktif",
    },
  ];

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Daftar Audit
        </h1>

        <button className="primary-button">
          + Audit Baru
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Gedung</th>
            <th>Periode</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id}>
              <td>
                <Link to={`/audits/${audit.id}`}>
                  {audit.building}
                </Link>
              </td>
              <td>{audit.period}</td>
              <td>{audit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}