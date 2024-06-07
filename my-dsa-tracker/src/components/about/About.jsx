import React from 'react';
import './About.css'; 
import {useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="about-container">
      <h1 onClick={handleClick}>About DSA Master</h1>
      <p>DSA Master  helps you build your confidence in solving any coding
         related question and helps you prepare for your placements.</p>
         <p>This is your DSA progress tracker based on AlgoPrep's 151 DSA sheet by  
          <a href="https://www.linkedin.com/in/chaharnishant11/" target="_blank"> Nishant Chahar</a></p>

      
    </div>
  );
};

export default About;

