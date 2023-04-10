import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './beforelogin/Home.js';
import Login from './beforelogin/Login';
import Register from './beforelogin/Register';
import About from './beforelogin/AboutSelf.js';
import Item from './beforelogin/item.js';

import Veg from './beforelogin/food lists/Veg';
import Bakery from './beforelogin/food lists/Bakery';
import Chinese from './beforelogin/food lists/Chinese';
import Boiled from './beforelogin/food lists/Boiled';

import Catagory from './afterlogginin/Catagory';
import Cart from './afterlogginin/cart/Cart.js';
import Userhome from './afterlogginin/Userhome.js';
import Contact from './afterlogginin/Contact.js';
import Orders from './afterlogginin/order/Orders.js';
import Payments from './afterlogginin/Payments.js';
import Veggies from './afterlogginin/items/Veggies.js';
import Baker from './afterlogginin/items/Baker.js';
import NonVeg from './afterlogginin/items/NonVeg.js';
import SeaFood from './afterlogginin/items/SeaFood.js';
import Update from './afterlogginin/profile/Update.js';
import Delete from './afterlogginin/profile/Delete.js';
import Profile from './afterlogginin/profile/Profile.js';
import Address from './afterlogginin/address/Address.js';
import OrderCreate from './afterlogginin/order/OrderCreate.js';
import EditAddress from './afterlogginin/address/EditAddress.js';
import AddAddress from './afterlogginin/address/AddAddress.js';
import PagenotFound from './PagenotFound.js';
import Auth from './Auth.js';
import CartRemove from './afterlogginin/cart/CartRemove.js';
import Test from './Test.js';
import SelectAddress from './afterlogginin/address/SelectAddress.js';
import SuccessPage from './afterlogginin/order/SuccessPage.js';
import OrderwithCart from './afterlogginin/order/OrderwithCart.js';
import SelectAddressforCart from './afterlogginin/address/SelectAddressforCart.js';
import Search from './Search.js';
import Solo from './afterlogginin/items/Solo.js';

const App=()=> {
  return (
    <>
    <BrowserRouter>

    <Routes>

      <Route path='/' element={<Auth><Userhome /></Auth>}></Route>

      <Route path='/Catagory' element={<Auth><Catagory/></Auth>}></Route>

      <Route path='/Orders' element={<Auth><Orders /></Auth>}></Route>

      <Route path='/Cart/:id' element={<Auth><Cart /></Auth>}></Route>

      <Route path='/Cart' element={<Auth><Cart /></Auth>}></Route>

      <Route path='/Update' element={<Auth><Update  /></Auth>}></Route>

      <Route path='/Delete' element={<Auth><Delete /></Auth>}></Route>

      <Route path='/Profile' element={<Auth><Profile /></Auth>}></Route>

      <Route path='/Contact' element={<Auth><Contact/></Auth>}></Route>

      <Route path='/EditAddress' element={<Auth><EditAddress/></Auth>}></Route>

      <Route path='/AddAddress' element={<Auth><AddAddress/></Auth>}></Route>

      <Route path='/Address' element={<Auth><Address/></Auth>}></Route>

      <Route path='/OrderCreate' element={<Auth><OrderCreate/></Auth>}></Route>

      <Route path='/OrderwithCart/:aid' element={<Auth><OrderwithCart/></Auth>}></Route>

      <Route path='/payments/:id/:aid' element={<Auth><Payments/></Auth>}></Route>
     
      <Route path='/payments' element={<Auth><Payments/></Auth>}></Route>
     
     <Route path='success'element={<Auth><SuccessPage/></Auth>}></Route>

      <Route path='/SelectAddress' element={<Auth><SelectAddress/></Auth>}></Route>

      <Route path='/SelectAddress/:id' element={<Auth><SelectAddress/></Auth>}></Route>

      <Route path='/SelectAddressforCart' element={<Auth><SelectAddressforCart/></Auth>}></Route>

      <Route path='/SelectAddressforCart/:id' element={<Auth><SelectAddressforCart/></Auth>}></Route>

      <Route path='/Veggies' element={<Auth><Veggies /></Auth>}></Route>

      <Route path='/Baker' element={<Auth><Baker/></Auth>}></Route>

      <Route path='/CartRemove/:id' element={<Auth> <CartRemove/></Auth>}></Route>

      <Route path='/NonVeg' element={<Auth><NonVeg /></Auth>}></Route>

      <Route path='/SeaFood' element={<Auth><SeaFood/></Auth>}></Route>

      <Route path='*' element={<Auth><PagenotFound/></Auth>}></Route>

      <Route path='/solo/:name' element={<Solo/>}></Route>
  
  
      <Route path='/home' element={<Home/>}></Route>  
      <Route path='/Catogiry' element={<Item />}></Route>
      <Route path='/About' element={<About />}></Route>
      <Route path='/search/:name' element={<Search />}></Route>
      <Route path='/Login' element={<Login />}></Route>
      <Route path='/Register' element={<Register />}></Route>
      <Route path='/Veg'element={<Veg />}></Route>
      <Route path='*' element={<PagenotFound/>}></Route>
      <Route path='/Bakery' element={<Bakery />}></Route>
      <Route path='/Chinese' element={<Chinese />}></Route>
      <Route path='/Boiled' element={<Boiled />}></Route>
      <Route path='/test' element={<Test/>}></Route>

  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App;
