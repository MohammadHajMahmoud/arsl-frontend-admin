import React, { useState, useEffect } from 'react';
import "./cssFile/dashboard.css"
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
const Dashboard = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [actions, setActions] = useState([]);
    const access_token = localStorage.getItem('token');

      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/models`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
          },
        })
          .then((response) => {
            setData(response.data)
              console.log(response.data)
          })
          .catch((error) => {
            console.error(error);
          });

      };

      const handleActionDisplay = (index,id) => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/models/${id}/actions`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
          },
        })
          .then((response) => {
            setActions(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
        setSelectedRow(index === selectedRow ? null : index);
      };
      const handleToggleClick = (index,id) => {
        axios.defaults.withCredentials = true;
        axios.put(`http://localhost:8080/models/${id}/activate`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
          },
        })
          .catch((error) => {
            console.error(error);
          });
        const updatedData = data.map((item, idx) => ({
          ...item,
          onProduction: idx === index,
        }));
        setData(updatedData);
      };
      const handleDownload = (id)=>{
        toast.success("downlading the model",{position:toast.POSITION.TOP_CENTER,autoClose: 1500,})
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/models/${id}/file`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
          },
        }).then((respsone)=>{
        })
          .catch((error) => {
            
            console.error(error);
          });
      }
      return (
        <table className="data-table">
          <ToastContainer/>
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Training Status</th>
              <th className="table-header">On Production</th>
              <th className="table-header">Loss</th>
              <th className="table-header">Accuracy</th>
              <th className="table-header">show actions</th>
              <th className="table-header">Set On Production</th>
              <th className="table-header">Download Model</th>


            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr className={`table-row ${index === selectedRow ? 'selected' : ''}`}>
                  <td className="table-cell">{item.id}</td>
                  <td className="table-cell">{item.trainingStatus}</td>
                  <td className="table-cell">{item.onProduction.toString()}</td>
                  <td className="table-cell">{item.loss}</td>
                  <td className="table-cell">{item.accuracy}</td>
                  <td className="table-cell">
                    <button
                      className="action-button"
                      onClick={() => handleActionDisplay(index,item.id)}
                    >
                      Display
                    </button>
                  </td>
                  <td className="table-cell">
                <button
                  className="action-button"
                  onClick={() => handleToggleClick(index,item.id)}
                >
                  Set
                </button>
              </td>
              <td className="table-cell">
                <a
                  className="action-button" href={`http://localhost:8080/models/${item.id}/file`}
                  onClick={() => handleDownload (item.id)}
                >
                 Download 
                </a>
              </td>
                </tr>
                {index === selectedRow && (
                  <tr>
                    <td colSpan="6" className="actions-cell">
                      <div className="actions-container">
                        <h3>Actions:</h3>
                        <ul>
                          {actions &&actions.map((action, index) => (
                            <li key={index}>{action.name}</li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      );
    };

export default Dashboard;
