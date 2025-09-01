import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Document from "./pages/Document";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Router>
        <NavBar className="sticky top-0 z-50 bg-white shadow" />

        {/* Main content should expand */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doc/:id" element={<Document />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}


export default App;
