
import React from 'react';
import './Prompt.css';

const Prompt = ({ message, onClose }) => {
  return (
    <div className="prompt">
      <div className="prompt-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Prompt;
