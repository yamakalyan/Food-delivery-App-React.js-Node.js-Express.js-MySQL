import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar =(props)=>{
   const navigator = useNavigate();
    return(
        <>
    <nav className="navbar navbar-expand-lg border-bottom border-light navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand pl-5 font-weight-bold" to="/">
            <img src="/20.jpg" width="40" height="40" className="d-inline-block align-top mr-3 rounded-circle" alt=""/>Kwality Delivery</Link>
                <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                <li><Link className="nav-link" to="/Catogiry">Catagory</Link></li>
                <li><Link className="nav-link" to={props.about} >About us</Link></li>
                </ul>
                </div>
        </div>
        <div className="container-fluid d-flex justify-content-end align-center">
        <button className="btn btn-primary m-2" onClick={()=>navigator('/Login')}>Login</button>
        <button className="btn btn-primary m-2" onClick={()=>navigator('/Register')}>Register</button>
        </div>
    </nav>
    </>
)
}
export default Navbar;