import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <section className="secnav">
<div>        <img src="/images/nflix.webp" alt="" className="logoapp" />
</div>
         <nav className="navbar">
      <NavLink to="/search" className="nav-item">
        <div>
          <i class="fi fi-br-search"></i>
        </div>
      </NavLink>
      <NavLink to="/" className="nav-item" end>
        <div>
          <i class="fi fi-rr-house-blank"></i>
        </div>
      </NavLink>
      <NavLink to="/movies" className="nav-item">
        <div>
          <i class="fi fi-rr-clapper-open"></i>
        </div>
      </NavLink>
      <NavLink to="/series" className="nav-item">
        <div>
          <i class="fi fi-rr-screen"></i>
        </div>
      </NavLink>
      <NavLink to="/top" className="nav-item">
        <div>
          <i class="fi fi-rr-heart"></i>
        </div>
      </NavLink>
      <NavLink to="/new" className="nav-item">
        <div>
          <i class="fi fi-rr-plus"></i>
        </div>
      </NavLink>

      </nav>
      <div className="exitcontainer">
        <i class="fi fi-rr-power"></i>
</div>
    </section>
 
  );
};

export default Navbar;