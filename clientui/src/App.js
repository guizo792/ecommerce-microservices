import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Command from "./pages/Command";
function App() {
  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/commander" element={<Command />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
