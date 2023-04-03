import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {CgDarkMode} from 'react-icons/cg'
import { useState } from 'react';

const Header =()=>{
let navigator = useNavigate();
const [btnColor, setbtnColor] = useState('dark')
const [bgcolor, setbgcolor] = useState('light');
const [searchResult, setSearchResult] =useState('')

const changeBgColor =()=>{
   if (bgcolor === 'light') {
    setbgcolor("dark");
    setbtnColor('light')
    document.body.style.backgroundColor = '#100f1d'
    document.body.style.color = 'white';
   } else {
    setbgcolor("light");
    setbtnColor('dark')
    document.body.style.backgroundColor = '#dad9d16b'
    document.body.style.color = 'black';
   }
}
const searchInput =(e)=>{
  setSearchResult(e.target.value)
}

const searchBar =(e)=>{
  e.preventDefault()
  navigator(`/Search/${searchResult}`)

}
    return(
        <>
         <nav className={`navbar navbar-expand-lg border-bottom border-dark navbar-${bgcolor} bg-${bgcolor}`}>
         <Link className="navbar-brand pl-5 font-weight-bold" to="/">
        <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>
         Kwality Delivery</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    <li><Link className="nav-link" to="/Catagory">Catagory</Link></li>
    <li><Link className="nav-link" to="/Orders">Orders</Link></li>
    <li> <Link className="nav-link" to="/Cart">Cart</Link></li>

      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to='' role="button" data-toggle="dropdown" aria-expanded="false">
          Profile
        </Link>
        <div className="dropdown-menu">
        <Link className="dropdown-item" to="/Profile">Profile</Link>
        <Link className="dropdown-item" to="/Update" >Update Info</Link>
        <Link className="dropdown-item" to="/Delete">Delete Account</Link>
        <Link className="dropdown-item" to="/Address">Address</Link>
      </div>
      </li>
    <li><Link className="nav-link" to="/Contact">Contact</Link></li>
    </ul>
    <form className="form-inline my-2 my-lg-0" onSubmit={searchBar}>
      <input className="form-control mr-sm-2" type="search" onChange={searchInput} placeholder="Search" aria-label="Search"/>
      <button className={`btn btn-outline-${btnColor} my-2 my-sm-0`} type="submit">Search</button>
    </form>
    <ul className="nav navbar-nav">
            <li><button className={`btn btn-outline-${btnColor} rounded m-2`} onClick={changeBgColor}><CgDarkMode/></button></li>
            <li><button className={`btn btn-outline-${btnColor} rounded m-2`} onClick={()=>{localStorage.removeItem('token');navigator('/Login', {replace : true})}}>Log-out</button></li>
        </ul>
  </div>
</nav>
    </>

)
}
export default Header;