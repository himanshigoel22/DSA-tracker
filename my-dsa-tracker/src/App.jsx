
import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/head/Header';
import Topics from './components/home/Topics';
import Questions from './components/questions/Questions';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About'; 
import Login from './components/login/Login'; 
import Signup from './components/signup/Signup'; 
import Footer from './components/footer/Footer';
import Prompt from './components/prompt/Prompt';
import './App.css'; 

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedInUser', true);
    setPromptMessage('User logged in!');
    setShowPrompt(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.removeItem('loggedInUser');
    setPromptMessage('User logged out!');
    setShowPrompt(true);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <Navbar
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
         
        <Content setIsLoggedIn={handleLogin} />
        {showPrompt && <Prompt message={promptMessage} onClose={closePrompt} />}
        <Footer /> 
      </div>
    </Router>
  );
};

const Content = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/about';

  return (
    <>
      {showHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/about" element={<About />} />
        <Route path="/questions/:topic" element={<Questions />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
