import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 font-sans text-gray-800">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}