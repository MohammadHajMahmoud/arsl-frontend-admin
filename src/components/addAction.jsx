import React, { useState } from 'react';
import axios from 'axios';

const AddAction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!selectedFile || !action) {
      alert('Please select a file and enter a word');
      return;
    }

    const formData = new FormData();
    formData.append('demo', selectedFile);
    console.log(selectedFile)
    console.log(action)
    axios.post(`http://localhost:8080/actions/${action}`, formData)
      .then((response) => {
        // Handle success
        console.log(response);
      })
      .catch((error) => {
        // Handle error
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
    </div>
  );
};

export default AddAction;