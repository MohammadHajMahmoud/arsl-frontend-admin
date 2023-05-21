import React, { useState } from 'react';
import axios from 'axios';
import './cssFile/login.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [role,setRole]=useState("")
  const handleDropdownChange = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username){
      alert("please Enter a valid userName")
    }
    if(password.length<8){
      alert("the minimum length for a password is 8")
    }
    if(password!==password2){
        alert("the Passwords dont match ")
        return
    }
    if(role==""){
        alert("Select a valid role")
        return
    }
    try {
      const response = await axios.post('http://localhost:8080/register', { username, password,role});
      console.log(response)
      const token = response.data.access_token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      window.location.href = '/add-action';
    } catch (error) {
      alert("Enter valid Registertion information")
      console.log('Login failed:', error);
    }
  };

  return (
    <div class="Register-page">
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
       <input className='log'
        type="password"
        placeholder="Confirm Passwword"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <select className='reg_sel log'  value={role} onChange={handleDropdownChange}>
        <option value="">Select Role</option>
        <option value="DATA_CLEANER">DATA_CLEANER</option>
      </select>
      < button className='btn' type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default Register;