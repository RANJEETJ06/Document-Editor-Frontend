import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Document from "./pages/Document";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  console.log("Current User:", user?.data?.id);
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Router>
        <NavBar className="sticky top-0 z-50 bg-white shadow" user={user} />

        {/* Main content should expand */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Routes path="/login">
            <Route path="/" element={<Home setUser={setUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doc/:id" element={<Document userId={user?.data?.id || 1} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}


export default App;
