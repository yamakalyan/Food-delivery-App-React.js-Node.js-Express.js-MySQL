import React from "react";
import { Link } from "react-router-dom";

const Navbar =()=>{
    return(
        <>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand pl-5" to="/Home">KD</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link" to="/About">About</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Contact">Contact</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Register">Sign-up</Link>
        </li>
    </ul>
    </div>
</nav>
        </div>
        </>
    )
}
export default Navbar;