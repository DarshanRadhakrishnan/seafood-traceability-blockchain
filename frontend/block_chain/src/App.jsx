import { StrictMode } from "react";   
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Participants from "./components/enterprise/Participants.jsx";
import Lots from "./components/enterprise/Lots.jsx";
import Analytics from "./components/enterprise/Analytics.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Consumer from "./pages/Consumer.jsx";
import "./index.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Enterprise */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/lots" element={<Lots />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* Consumer */}
        <Route path="/consumer" element={<Consumer />} />

        {/* Fallback */}
        <Route path="*" element={<h2>404 | Page Not Found</h2>} />
      </Routes>
    </>
  );
}

