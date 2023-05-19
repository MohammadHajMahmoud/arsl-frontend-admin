import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AddAction from './components/addAction';
import CleanData from './components/cleanData';
import Validate from './components/Validate';
import NeuralComponent from './components/NeuralComponent';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Login';
import BotNavigation from "./components/nav"
function App() {
  return (
<BrowserRouter>
      <BotNavigation/> 
     <Routes>
      <Route path ="/login" element ={<LoginForm/>}/>
        <Route path ="/add-action" element={<ProtectedRoute><AddAction/></ProtectedRoute>}/>
         <Route path='/clean-data' element={<ProtectedRoute><CleanData/></ProtectedRoute>}/>
         <Route path='/validate/:action' element={<ProtectedRoute><Validate/></ProtectedRoute>}/>
         <Route path='/neural'element={<ProtectedRoute><NeuralComponent/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
