import React from 'react';
import './ProgressBar.css';

const totalQuestions = 150;

const ProgressBar = ({ totalCompletedQuestions }) => {
  const percentage = totalQuestions ? (totalCompletedQuestions / totalQuestions) * 100 : 0;
  const barStyle = {
    width: `${percentage}%`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar-inner" style={barStyle}></div>
      </div>
      <p className="progress-bar-text">{`Total questions solved : ${totalCompletedQuestions}/${totalQuestions} (${percentage.toFixed(2)}%)`}</p>
    </div>
  );
};

export default ProgressBar;
