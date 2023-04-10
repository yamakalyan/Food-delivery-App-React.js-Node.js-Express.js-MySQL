import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgDarkMode } from "react-icons/cg";

const Navbar =()=>{
   const navigator = useNavigate();
   const [bgColor,  setbgColor]  = useState('light')
   const [btn, setBtn] = useState('dark')
   const [searchResult, setSearchResult] = useState('')

   const changeBgColor =()=>{
    if (bgColor === 'light') {
        setbgColor('dark')
        setBtn('light')
        document.body.style.color = 'white'
        document.body.style.background = '#100f1d'
    } else {
        setbgColor('light')
        setBtn('dark')
        document.body.style.background = '#dad9d16b'
        document.body.style.color = 'black'
    }
   }

   const searchInput =(e)=>{
    setSearchResult(e.target.value)
   }

   const searchBar =(e)=>{
    navigator(`/searchlog/${searchResult}`)
   }
    return(
        <>
    <nav className={`navbar navbar-expand-lg border-bottom border-${btn} sticky-top navbar-${bgColor} bg-${bgColor}`}>
            <Link className="navbar-brand pl-5 font-weight-bold" to="/home">
            <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>Kwality Delivery</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li><Link className="nav-link" to="/Catogiry">Catagory</Link></li>
                <li><Link className="nav-link" to='/About' >About Me</Link></li>
                </ul>
        <form className="form-inline my-2 my-lg-0 mr-5" onSubmit={searchBar}>
      <input className="form-control mr-sm-2" onChange={searchInput} type="search" placeholder="Search" aria-label="Search"/>
      <button className={`btn btn-outline-${btn} my-2 my-sm-0`} type="submit">Search</button>
    </form>
    <ul className="nav navbar-nav">
        <li><button className={`btn btn-outline-${btn} m-2`} onClick={()=>navigator('/Login')}>Login</button></li>
        <li> <button className={`btn btn-outline-${btn} m-2`} onClick={()=>navigator('/Register')}>Register</button></li>
        <li> <button className={`btn btn-outline-${btn} rounded border-none m-2`} onClick={changeBgColor}><CgDarkMode/></button></li>
        </ul>
        </div>
    </nav> 
    </>
)
}
export default Navbar;