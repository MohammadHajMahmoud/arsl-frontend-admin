import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router';

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
      alert('Please select a file and enter a word');
      return;
    }
        const formData = new FormData();
        let body={name:action , status : demoStatus , requiresGathering :isRequiresGathering }
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
              console.log(response)
            console.log("hi");
          })
          .catch((error) => {
            console.error(error);
          });

      };

     
   

  return (
    <div>
      <h1>upload action</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select Video:</label>
          <input type="file" id="file" accept="video/*" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="word">Enter Word:</label>
          <input type="text" id="word" value={action} onChange={handleActionChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      <select value={demoStatus} onChange={handleDropdownChange}>
        <option value="">Select...</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="UNAVAILABLE">UNAVAILABLE</option>
      </select>
      <br />
      <label htmlFor="checkbox"> requiresGathering</label>
        <input
          type="checkbox"
          checked={isRequiresGathering}
          onChange={handleCheckboxChange}
        />
    </div>
  );
};

export default AddAction;