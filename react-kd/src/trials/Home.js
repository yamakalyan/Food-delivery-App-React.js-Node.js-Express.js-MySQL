import React from "react";
import Navbar from "./Navbar";

const Home =()=>{

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row-1">
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