import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <section className="secnav">
      <div>
        <img src="/images/nflix.webp" alt="" className="logoapp" />
      </div>
      <nav className="navbar">
        <NavLink to="/search" className="nav-item">
          <div>
            <i className="fi fi-br-search"></i>
          </div>
        </NavLink>
        <NavLink to="/home" className="nav-item" end>
          <div>
            <i className="fi fi-rr-house-blank"></i>
          </div>
        </NavLink>
        <NavLink to="/movies" className="nav-item">
          <div>
            <i className="fi fi-rr-clapper-open"></i>
          </div>
        </NavLink>
        <NavLink to="/series" className="nav-item">
          <div>
            <i className="fi fi-rr-tv-retro"></i>
          </div>
        </NavLink>
        <NavLink to="/favorites" className="nav-item">
          <div>
            <i className="fi fi-rr-heart"></i>
          </div>
        </NavLink>
        <NavLink to="/add" className="nav-item">
          <div>
            <i className="fi fi-rr-plus"></i>
          </div>
        </NavLink>
      </nav>
      <div className="exitcontainer" onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <i className="fi fi-rr-power"></i>
      </div>
    </section>
  );
};

export default Navbar;