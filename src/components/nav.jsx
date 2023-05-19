import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import './cssFile/navCss.css'
import { fontSize } from '@mui/system';
export default function BotNavigation(){
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()
 
  return (
      <Box >
      <BottomNavigation
     sx={{

   }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
       <BottomNavigationAction label={<span className="bottomNavLabel">register Data cleaner</span>} onClick={()=>navigate("/register")}  />
        <BottomNavigationAction label={<span className="bottomNavLabel"> add action</span>} onClick={()=>navigate("/add-action")}/>
        <BottomNavigationAction label={<span className="bottomNavLabel">clean data</span>} onClick={()=>navigate("/clean-data")}/>
        <BottomNavigationAction label={<span className="bottomNavLabel">create a neural</span>} onClick={()=>navigate("/neural")}  />
      </BottomNavigation>
    </Box>
    
  );
}