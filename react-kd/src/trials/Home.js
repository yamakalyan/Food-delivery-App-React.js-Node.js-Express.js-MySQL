import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home =()=>{

    return(
        <>
        <Navbar/>
        <h1>helloooo</h1>
        <Link to='/About' >About</Link>
        <div className="container">
            <div className="row">
              <div className="col">
                <img src="/1.png" className="img-fluid" alt="" />
              </div>
              <div className="col">
                <img src="/2.png" className="img-fluid" alt="" />
              </div>
              <div className="col">
                <img src="/3.png" className="img-fluid" alt="" />
              </div>
              <div className="col">
                <img src="/4.png" className="img-fluid" alt="" />
              </div>
            
            </div>
        </div>
        </>
    )
}
export default Home;