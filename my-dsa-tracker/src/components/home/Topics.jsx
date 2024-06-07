import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../progress/ProgressBar';
import './Topics.css';
import questionsData from '../../data/questions.json';

const Topic = ({ title, totalQuestions, completedQuestions, onClick }) => (
  <div className="topic">
    <h2>{title}</h2>
    <h3>Total Questions: {totalQuestions}</h3>
    <p>Status: {completedQuestions}/{totalQuestions}</p>
    <button 
      className="start-button"
      onClick={onClick}
    >
      Open
    </button>
  </div>
);

const Topics = () => {
  const navigate = useNavigate();
  const [topicsStatus, setTopicsStatus] = useState([]);
  const [totalCompletedQuestions, setTotalCompletedQuestions] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const isLoggedIn = localStorage.getItem('loggedInUser');
    
    const calculatedTopicsStatus = Object.keys(questionsData).map(topic => {
      const totalQuestions = questionsData[topic].length;
      let completedQuestions = 0;

      if (isLoggedIn) {
        completedQuestions = (userData[topic] || []).filter(done => done).length;
      }

      return { title: topic, totalQuestions, completedQuestions };
    });

    setTopicsStatus(calculatedTopicsStatus);

    const totalCompleted = calculatedTopicsStatus.reduce((acc, topic) => acc + topic.completedQuestions, 0);
    setTotalCompletedQuestions(totalCompleted);
  }, []);

  const startTopic = (title) => {
    navigate(`/questions/${title}`);
  };

  return (
    <div className="topics-container">
       <ProgressBar totalCompletedQuestions={totalCompletedQuestions} /> 
      {topicsStatus.map((topic, index) => (
        <Topic
          key={index}
          title={topic.title}
          totalQuestions={topic.totalQuestions}
          completedQuestions={topic.completedQuestions}
          onClick={() => startTopic(topic.title)}
        />
      ))}
     
    </div>
  );
};

export default Topics;
