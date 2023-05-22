import React, { useState } from 'react';
import axios from 'axios';
import './cssFile/login.css'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
      toast.error("please Enter a valid userName",{position:toast.POSITION.TOP_CENTER})
      return
    }
    if(password.length<8){
      toast.error("the minimum length for a password is 8",{position:toast.POSITION.TOP_CENTER})
      return
    }
    if(password!==password2){
      toast.error("passwords dont match!",{position:toast.POSITION.TOP_CENTER})
        return
    }
    if(role==""){
      toast.error("Please select a valid Role",{position:toast.POSITION.TOP_CENTER})

        return
    }
    try {
      const response = await axios.post('http://localhost:8080/register', { username, password,role});
      console.log(response)
      const token = response.data.access_token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      toast.success("User Created Succefully! Redirecting to login page",{position:toast.POSITION.TOP_CENTER,  hideProgressBar: true,
      })
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.log('Register Failed:', error);
    }
  };

  return (
    <div class="Register-page">
      <ToastContainer/>
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
        placeholder="Confirm Password"
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