import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componants/Home.js';
import Login from './componants/Login';
import Register from './componants/Register';
import Catagory from './afterlogginin/Catagory';

import Veg from './food lists/Veg.jsx';
import Burgers from './food lists/Burgers.jsx';
import Bakery from './food lists/Bakery.jsx';
import Chinese from './food lists/Chinese.jsx';
import Boiled from './food lists/Boiled.jsx';
import Italian from './food lists/Italian.jsx';

import Search from './componants/Searchbar.js';
import Cart from './afterlogginin/Cart.js';
import Logout from './afterlogginin/Logout.js';
import Userhome from './afterlogginin/Userhome.js';
import About from './afterlogginin/About.js';
import Contact from './afterlogginin/Contact.js';
import Orders from './afterlogginin/Orders.js';
import Item from './componants/item.js';


const App=()=> {

const loggedIn = false;

  return (
    <>

    {loggedIn ?
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Userhome/>}></Route>
      <Route path='/Catagory' element={<Catagory/>}></Route>
      <Route path='/Logout'element={<Logout />}></Route>
      <Route path='/Orders'element={<Orders />}></Route>
      <Route path='/Cart'element={<Cart />}></Route>
      <Route path='/About'element={<About />}></Route>
      <Route path='/Contact'element={<Contact />}></Route>

      <Route path='/Veg'element={<Veg />}></Route>
      <Route path='/Burgers'element={<Burgers />}></Route>
      <Route path='/Bakery'element={<Bakery />}></Route>
      <Route path='/Chinese'element={<Chinese />}></Route>
      <Route path='/Boiled'element={<Boiled />}></Route>
      <Route path='/Italian'element={<Italian />}></Route>
    </Routes>
    </BrowserRouter>
  :
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/Catogiry' element={<Item />}></Route>
    <Route path='/Login'element={<Login />}></Route>
    <Route path='/Search'element={<Search />}></Route>
    <Route path='/Register'element={<Register />}></Route>
  
  </Routes>
  </BrowserRouter>
  
  }
    </>
  )
}

export default App;
