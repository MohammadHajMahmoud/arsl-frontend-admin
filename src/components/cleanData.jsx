import React, { useEffect, useState } from 'react';
import "./cssFile/availableWords.css"
import ActionComponent from "./actionComponent";
import { persistenceApi } from './apis';

function CleanData() {
  const [actions,setActions] = useState([]);
  useEffect(() => {
    persistenceApi.get(`/actions`)
      .then((response) => {
        const extractedNames = response.data.map(obj => obj.name);
        setActions(extractedNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    return(  
      <div class="center">
        <ul>
          {actions.map(action=><ActionComponent action={action}/>)}
        </ul>
      </div>
    )
}

export default CleanData