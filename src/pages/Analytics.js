import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/analytics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 SmartLink Analytics</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-6"
      >
        Logout
      </button>

      {data ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p className="text-gray-500">Loading analytics...</p>
      )}
    </div>
  );
}

export default Analytics;
