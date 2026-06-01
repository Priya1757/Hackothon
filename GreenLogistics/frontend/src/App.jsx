import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login          from "./pages/Login";
import Dashboard      from "./pages/Dashboard";
import Shipments      from "./pages/Shipments";
import Analytics      from "./pages/Analytics";
import RouteOptimizer from "./pages/RouteOptimizer";
import Sidebar        from "./components/Sidebar";

// Wraps every authenticated page with the shared Sidebar
function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#05140a" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected — all share the same Sidebar instance */}
        <Route path="/dashboard"  element={<Layout><Dashboard /></Layout>} />
        <Route path="/shipments"  element={<Layout><Shipments /></Layout>} />
        <Route path="/analytics"  element={<Layout><Analytics /></Layout>} />
        <Route path="/routes"     element={<Layout><RouteOptimizer /></Layout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}