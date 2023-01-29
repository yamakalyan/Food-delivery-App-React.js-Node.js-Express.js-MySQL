import React from "react";
import { Link } from "react-router-dom";


const Header =(props)=>{

    
   
    return(

        <>
        <nav className={`navbar navbar-expand-lg border-bottom border-${props.border}
         navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
    
        <Link className="navbar-brand pl-5 font-weight-bold" to="/Userhome">
        <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>
         K D</Link>
            <div className="collapse navbar-collapse">
    <ul className="nav navbar-nav">
        <li><Link className="nav-link" to="/About">About</Link></li>
        <li><Link className="nav-link" to="/Contact">Contact</Link></li>
        <li><Link className="nav-link" to="/Catagory">Catagory</Link></li>
        <li><Link className="nav-link" to="/logout">Log-Out</Link></li>
        <li> <Link className="nav-link" to="/Cart">Cart</Link></li>
    </ul>
    </div>
    <div className="nav navbar-nav">
        <button className="btn btn-light rounded" onClick={props.changeBg} >{props.btn}</button>
    </div>
        </div>
        </nav>
        </>

)
}
export default Header;