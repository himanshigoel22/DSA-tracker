import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header>
      <div className='header'>
        <h1 onClick={handleClick}> DSA Master Sheet</h1>
        {location.pathname === '/' && <p>Your Gateway to crack DSA !!</p>}
      </div>
    </header>
  );
};

export default Header;
