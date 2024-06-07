
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = { username, email, password, progress: {} };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login'); 
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Signup</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;