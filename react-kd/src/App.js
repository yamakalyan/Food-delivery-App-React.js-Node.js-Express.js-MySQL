import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componants/Home.js';
import Login from './componants/Login';
import Register from './componants/Register';
import Catagory from './afterlogginin/Catagory';

import Veg from './food lists/Veg.jsx';
import Bakery from './food lists/Bakery.jsx';
import Chinese from './food lists/Chinese.jsx';
import Boiled from './food lists/Boiled.jsx';

import Cart from './afterlogginin/Cart.js';
import Userhome from './afterlogginin/Userhome.js';
import About from './afterlogginin/About.js';
import Contact from './afterlogginin/Contact.js';
import Orders from './afterlogginin/Orders.js';
import Item from './componants/item.js';
import Payments from './afterlogginin/Payments.js';
import Veggies from './afterlogginin/items/Veggies.js';
import Baker from './afterlogginin/items/Baker.js';
import NonVeg from './afterlogginin/items/NonVeg.js';
import SeaFood from './afterlogginin/items/SeaFood.js';

const App=()=> {

  const loggedIn = true;
  return (
    <>
    {loggedIn ?
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Userhome />}></Route>
      <Route path='/Catagory' element={<Catagory/>}></Route>
      <Route path='/Orders' element={<Orders />}></Route>
      <Route path='/Cart/:id' element={<Cart />}></Route>
      <Route path='/Cart' element={<Cart/>}></Route>
      <Route path='/About' element={<About />}></Route>
      <Route path='/Contact' element={<Contact />}></Route>
      <Route path='/payments' element={<Payments/>}></Route>

      <Route path='/Veggies' element={<Veggies />}></Route>
      <Route path='/Baker' element={<Baker />}></Route>
      <Route path='/NonVeg' element={<NonVeg />}></Route>
      <Route path='/SeaFood' element={<SeaFood />}></Route>
    </Routes>
    </BrowserRouter>
  :
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/Catogiry' element={<Item />}></Route>
    <Route path='/About' element={<About />}></Route>
    <Route path='/Login' element={<Login />}></Route>
    <Route path='/Register' element={<Register />}></Route>

    <Route path='/Veg'element={<Veg />}></Route>
      <Route path='/Bakery' element={<Bakery />}></Route>
      <Route path='/Chinese' element={<Chinese />}></Route>
      <Route path='/Boiled' element={<Boiled />}></Route>
  
  </Routes>
  </BrowserRouter>
  
  }
    </>
  )
}

export default App;
