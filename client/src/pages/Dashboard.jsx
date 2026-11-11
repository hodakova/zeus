import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244058]">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Audit" value="12" />
        <StatCard title="Audit Aktif" value="3" />
        <StatCard title="Audit Selesai" value="9" />
        <StatCard title="Rata-rata IKE" value="185" />
      </div>
    </>
  );
}