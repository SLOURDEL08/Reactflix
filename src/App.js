import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import SerieDetails from "./pages/SerieDetails";


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
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/serie/:id" element={<SerieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
