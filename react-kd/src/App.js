import React from 'react';
import Home from './trials/Home.js';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import About from './trials/About.js'
import Contact from './trials/Contact.js';
import Login from './trials/Login.js';
import Register from './trials/Register.js';

const App=()=> {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/Contact' element={<Contact/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App;
