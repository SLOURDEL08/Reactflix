import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img src="/images/search.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/home.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/movie.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/tv.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/top.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/plus.png" alt="icon aleatoire" />
        </Link>
      </div>
      <div>
        <Link to="/movie/123">
          <img src="/images/aleatoire.png" alt="icon aleatoire" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
