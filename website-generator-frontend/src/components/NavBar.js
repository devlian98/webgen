import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">WebsiteGen</div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#templates">Templates</a>
        </li>
        <li>
          <a href="#pricing">Pricing</a>
        </li>
        <li>
          <a href="#support">Support</a>
        </li>
      </ul>
      <div className="nav-buttons">
        <Link to="/login">
          <button className="nav-cta">Login</button>
        </Link>
        <Link to="/signup">
          <button className="nav-cta">Start Building</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
