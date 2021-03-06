import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Dashboard from './Components/Dashboard/Dashboard';
import Logout from './Components/Logout/Logout';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div >
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/registration' element={<Registration/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
        <ToastContainer  autoClose={2000}/>
    </div>
  );
}

export default App;
