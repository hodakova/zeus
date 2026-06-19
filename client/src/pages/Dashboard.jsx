import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Dashboard
        </h1>
      </div>

      <div className="dashboard-grid">
        <StatCard
          title="Total Audit"
          value="12"
        />

        <StatCard
          title="Audit Aktif"
          value="3"
        />

        <StatCard
          title="Audit Selesai"
          value="9"
        />

        <StatCard
          title="Rata-rata IKE"
          value="185"
        />
      </div>
    </>
  );
}