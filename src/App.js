
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import MyCustomers from './Component/MyCustomers';
import AddFood from './Component/AddFood';
import Orders from './Component/Order';
import HomePage from './Component/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      
      <Route path='/login-user' element={<Login/>}></Route>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/my-customer' element={<MyCustomers/>}></Route>
      <Route path='/add-food' element={<AddFood/>}></Route>
      <Route path='/orders' element={<Orders/>}></Route>
     
      
     
      
      </Routes>

      
      </BrowserRouter>
  );
}

export default App;
