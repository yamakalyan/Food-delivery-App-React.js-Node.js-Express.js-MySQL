import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './trials/Home.js';
import About from './trials/About.js';
import Contact from './trials/Contact';
import Login from './trials/Login';
import Register from './trials/Register';
import Product from './trials/Products';


const App=()=> {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/About'element={<About />}></Route>
      <Route path='/Contact'element={<Contact />}></Route>
      <Route path='/Login'element={<Login />}></Route>
      <Route path='/Register'element={<Register />}></Route>
      <Route path='/Product'element={<Product />}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App;
