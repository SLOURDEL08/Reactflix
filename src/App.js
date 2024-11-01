import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import ContentDetails from "./components/ContentDetails";
import "./App.css";
import Favorites from "./pages/Favorites";
import AddContent from "./pages/addContent";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add" element={<AddContent/>} />{/* Ajoutez cette ligne */}
          <Route path="/:type/:slug" element={<ContentDetails />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;