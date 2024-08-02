import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.jpeg'; // Ensure you have the logo image
import '../css/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="brand-name">MERN Mavericks</div>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
