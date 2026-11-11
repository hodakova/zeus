import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";
import { AuditProvider } from "./context/AuditContext";

export default function App() {
  return (
    <AuditProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuditProvider>
  );
}