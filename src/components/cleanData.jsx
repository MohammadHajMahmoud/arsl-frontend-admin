import React, { useEffect, useState } from 'react';
import "./cssFile/availableWords.css"
import ActionComponent from "./actionComponent";
import axios from 'axios';
function CleanData() {
const [actions,setActions] = useState([]);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:8080/actions`)
      .then((response) => {
        const extractedNames = response.data.map(obj => obj.name);
        setActions(extractedNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
    const actionsList= actions.map(action=><ActionComponent action={action}/>)
    return(
        
            <div class="center">
             <ul>
                 {actionsList}
                 </ul>
            </div>
            
    )
}

export default CleanData