import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Questions.css';
import questionsData from '../../data/questions.json';

const Questions = () => {
  const { topic } = useParams();
  const questionsList = questionsData[topic];
  const [questions, setQuestions] = useState(questionsList.map(q => ({ ...q, done: false })));

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userDataForTopic = userData[topic] || Array(questionsList.length).fill(false);

    const isLoggedIn = localStorage.getItem('loggedInUser'); 

    if (isLoggedIn) {
      const updatedQuestions = questions.map((question, index) => ({
        ...question,
        done: userDataForTopic[index]
      }));
      setQuestions(updatedQuestions);
    } else {
      const resetQuestions = questionsList.map(q => ({ ...q, done: false }));
      setQuestions(resetQuestions);
    }
  }, [topic, questionsList.length]);

  const handleToggleDone = (index) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map((q, i) => i === index ? { ...q, done: !q.done } : q);

      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      userData[topic] = updatedQuestions.map(q => q.done);
      localStorage.setItem('userData', JSON.stringify(userData));

      return updatedQuestions;
    });
  };

  const totalQuestions = questionsList.length;
  const doneQuestions = questions.filter(q => q.done);
  const notDoneQuestions = questions.filter(q => !q.done);

  return (
    <div className="questions">
      <h2>{topic}</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Status : {doneQuestions.length}/{totalQuestions}</th>
          </tr>
        </thead>
        <tbody>
          {notDoneQuestions.map((question, index) => (
            <tr key={index} className={question.done ? 'done' : ''}>
              <td><a href={question.link} target="_blank" rel="noopener noreferrer">{question.name}</a></td>
              <td>
                <button
                  onClick={() => handleToggleDone(index)}
                  className={question.done ? 'undone-button' : 'done-button'}
                >
                  {question.done ? 'Undone' : 'Done'}
                </button>
              </td>
            </tr>
          ))}
          {doneQuestions.map((question, index) => (
            <tr key={index + notDoneQuestions.length} className={question.done ? 'done' : ''}>
              <td><a href={question.link} target="_blank" rel="noopener noreferrer">{question.name}</a></td>
              <td>
                <button
                  onClick={() => handleToggleDone(index + notDoneQuestions.length)}
                  className={question.done ? 'undone-button' : 'done-button'}
                >
                  {question.done ? 'Undone' : 'Done'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
