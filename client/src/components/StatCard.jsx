export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm text-gray-500 mb-2 font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  );
}