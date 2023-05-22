import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router';
import "./cssFile/addAction.css"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddAction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState('');
  const [demoStatus, setDemoStatus] = useState('');
  const [isRequiresGathering, setisRequiresGathering] = useState(false);
 const access_token = localStorage.getItem('token');
 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setDemoStatus(event.target.value);
  };

  const handleCheckboxChange = () => {
    setisRequiresGathering(!isRequiresGathering);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile || !action) {
      toast.error('Please select a file and enter an action',{position:toast.POSITION.TOP_CENTER})
      return;
    }
    if(demoStatus ==""){
      toast.error('Please select status for the action',{position:toast.POSITION.TOP_CENTER})
      return;
    }
        const formData = new FormData();
        let body={name:action , status : demoStatus , requiresGathering :isRequiresGathering }
        console.log(body)
        let strbody = JSON.stringify(body);
        const blob = new Blob([strbody], {
          type: 'application/json'
        });
        formData.append('body', blob);
        formData.append('demo',selectedFile)
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:8080/actions`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`

          },
        })
          .then((response) => {
            toast.success('Action Added Successfully', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            
              console.log(response)
          })
          .catch((error) => {
            console.error(error);
          });

      };

     
   

  return (
    <div className= 'add-action-container'>
    <ToastContainer/>
      <form className ="action-form"onSubmit={handleSubmit}>       
        <div className='small-action-con' >
          <input placeholder='Enter an Action word' className='input-action'  type="text" id="word" value={action} onChange={handleActionChange} />
        </div>
      
      <select  className='input-action'  value={demoStatus} onChange={handleDropdownChange}>
        <option value="">Select Status</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="UNAVAILABLE">UNAVAILABLE</option>
      </select>
      
      <div className='small-action-con'>
          <label className='label1 ' >Select Demo:</label>
          <input className='input-action' type="file" id="file" accept="video/*" onChange={handleFileChange} />
        </div>
        <div > 
      <label htmlFor="check">Require Gathering ? </label>
        <input
        className='check'
          type="checkbox"
          checked={isRequiresGathering}
          onChange={handleCheckboxChange}
        />
      </div>
      
        <div className='btn-con'>
        <button className='btn-add-action ' type="submit">add action</button>

          </div>

        </form>
    </div>
  );
};

export default AddAction;