import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Indonesia from "./pages/Indonesia";
import Programming from "./pages/Programming";
import Saved from "./pages/Saved";
import RouteWatcher from "./components/RouteWatcher";
import Search from "./pages/Search";

function router() {
  return (
    <Router>
      <RouteWatcher />
      <div>
        <Routes>
          <Route path="/" element={<Indonesia />} />
          <Route path="/Programming" element={<Programming />} />
          <Route path="/Saved" element={<Saved />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default router;
