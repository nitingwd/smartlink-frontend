import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Optional: Sync token if localStorage changes externally
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Protected Analytics Route */}
        <Route
          path="/analytics"
          element={token ? <Analytics /> : <Navigate to="/login" />}
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
