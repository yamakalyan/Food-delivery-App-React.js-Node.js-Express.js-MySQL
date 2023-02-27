import React from "react";
import { Link } from "react-router-dom";

const Navbar =(props)=>{
   
    return(
        <>
        <nav className="navbar navbar-expand-lg border-bottom border-light navbar-dark bg-dark">
        <div className="container-fluid">
    
        <Link className="navbar-brand pl-5 font-weight-bold" to="/">
        <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>
         KD</Link>
            <div className="collapse navbar-collapse">
    <ul className="nav navbar-nav">
        <li><Link className="nav-link" to="/Catogiry">Catagory</Link></li>
        <li><Link className="nav-link" to="/Login">Log-In</Link></li>
        <li> <Link className="nav-link" to="/Register">Sign-Up</Link></li>
        <li> <Link className="nav-link" to="/Search">Search</Link></li>
    </ul>
    </div>
    <div className="nav navbar-nav">
    <form className="form-inline my-2 my-lg-0" onSubmit={props.searchBtn} >
      <input className="form-control mr-sm-2" onChange={props.searchChange} type="text" placeholder="Search" aria-label="Search"/>
      <input className="btn btn-outline-success my-2 my-sm-0" value="Search"  type="submit"/>
    </form>
    </div>
        </div>
        </nav>
        </>
)
}
export default Navbar;