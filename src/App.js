import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">SmartLink</h1>
          <nav className="space-x-6">
            <a href="#features" className="hover:text-indigo-500">Features</a>
            <a href="#dashboard" className="hover:text-indigo-500">Dashboard</a>
            <a href="#contact" className="hover:text-indigo-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4 text-indigo-700">Welcome to SmartLink 🚀</h2>
        <p className="text-lg max-w-xl mb-6">
          Your smart dashboard for managing and sharing links with ease.
        </p>
        <a
          href="/dashboard"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </a>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SmartLink. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
