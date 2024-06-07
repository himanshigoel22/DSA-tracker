import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn, handleLogout, toggleDarkMode, isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = (e) => {
    if (location.pathname === '/about') {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/about" onClick={handleAboutClick}>About</Link>
      </div>
      <div className="navbar-right">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
