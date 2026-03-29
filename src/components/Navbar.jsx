import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const today = new Date().toLocaleDateString();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Smart Health Tracker</h1>
      </div>

      <div className="navbar-tabs">
        <NavLink
          to="/entry"
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          Data Entry
        </NavLink>
        <NavLink
          to="/analysis"
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          Analysis
        </NavLink>
      </div>

      <div className="navbar-menu">
        <span>{today}</span>
      </div>
    </nav>
  );
};

export default Navbar;
