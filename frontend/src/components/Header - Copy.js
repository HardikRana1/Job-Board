import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/Logo.jpeg'; // Ensure you have the logo image
import './Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="brand-name">MERN Mavericks</div>
      </div>
      <nav>
        <ul className="nav-links">
          
          <li className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search jobs" className="search-input" />
          </li>
          <li>
            <Link to="/applied-jobs">Applied Jobs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
