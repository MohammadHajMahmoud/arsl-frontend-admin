import React, { useState } from 'react';
import axios from 'axios';
import './cssFile/login.css'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });
      console.log(response)
      const token = response.data.access_token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      window.location.href = '/add-action';
    } catch (error) {
      alert("Enter valid login informations")
      console.log('Login failed:', error);
    }
  };

  return (
    <div class="login-page">
    <div class="form">
    <form className="login-form" onSubmit={handleSubmit}>
      <input
      className='log'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className='log'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      < button className='btn' type="submit">Login</button>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;