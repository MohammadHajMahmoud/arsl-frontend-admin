import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AddAction from './components/addAction';
import CleanData from './components/cleanData';
import ShowDemo from './components/ShowDemo';
import Validate from './components/Validate';
import NeuralComponent from './components/NeuralComponent';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Login';
import BotNavigation from "./components/nav"
import Register from "./components/Register"
import Dashboard from './components/adminDashboard';
function App() {
  return (
<BrowserRouter>
      <BotNavigation/> 
     <Routes>
      <Route path ="" element ={<LoginForm/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>} />
        <Route path ="/add-action" element={<ProtectedRoute><AddAction/></ProtectedRoute>}/>
         <Route path='/clean-data' element={<ProtectedRoute><CleanData/></ProtectedRoute>}/>
         <Route path='/validate/:action' element={<ProtectedRoute><Validate/></ProtectedRoute>}/>
         <Route path='/show-demo/:action' element={<ProtectedRoute><ShowDemo/></ProtectedRoute>}/>
         <Route path='/neural' element={<ProtectedRoute><NeuralComponent/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
