import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';



const Header =()=>{

const [bgcolor, setbgcolor] = useState('light');
const [btn, setbtn] = useState('DArkMode')

const changeBgColor =()=>{
   if (bgcolor === 'light') {
    setbgcolor("dark");
    setbtn('LightMode')
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
   } else {
    setbgcolor("light");
    setbtn('DarkMode')
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';


   }
}
    return(
        <>
        <nav className={`navbar navbar-expand-lg border-bottom border-dark
         navbar-${bgcolor} bg-${bgcolor}`}>
        <div className="container-fluid">    
        <Link className="navbar-brand pl-5 font-weight-bold" to="/">
        <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>
         K D</Link>
        <div className="collapse navbar-collapse">
    <ul className="nav navbar-nav">
        <li><Link className="nav-link" to="/About">About</Link></li>
        <li><Link className="nav-link" to="/Contact">Contact</Link></li>
        <li><Link className="nav-link" to="/Catagory">Catagory</Link></li>
        <li><Link className="nav-link" to="/Orders">Orders</Link></li>
        <li> <Link className="nav-link" to="/Cart">Cart</Link></li>
    </ul>
    </div>

        <ul className="nav navbar-nav">
            <li><button className="btn btn-success rounded mr-2" onClick={changeBgColor}>{btn}</button></li>
            <li><button className="btn btn-primary rounded ml-2">Log-out</button></li>
        </ul>

    </div>

    </nav>
    </>

)
}
export default Header;