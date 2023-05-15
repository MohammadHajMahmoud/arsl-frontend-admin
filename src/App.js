import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AddAction from './components/addAction';
import CleanData from './components/cleanData';
import Validate from './components/Validate';
function App() {
  return (
<BrowserRouter>
     <Routes>
        <Route path ="/add-action" element ={<AddAction/>}/>
         <Route path='/clean-data' element={<CleanData/>}/>
         <Route path='/validate/:action' element={<Validate/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
