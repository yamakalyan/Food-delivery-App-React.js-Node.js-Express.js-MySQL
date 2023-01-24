import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Catagory =()=>{ 

  return(
    <>
    <Header/>
    <div className="container">

      <div className="row">

        <div className="col-3 m-3 shadow">
        <Link to="/Veg" className=" text-dark">
          <img src="/19.jpg" className="img-fluid" alt="" />
          <h4>Veg-Starters</h4>
          <p>Price starts From : 19.99$ - 29.99$</p>
        </Link>
        </div>

          <div className="col-3 m-3 shadow">
        <Link to="/Burgers" className=" text-dark"> 
          <img src="/11.jpg" className="img-fluid" alt="" />
          <h4>Burgers And More </h4>
          <p>Price starts From : 9.99$ - 19.99$</p>
        </Link>
          </div>

          <div className="col-3 m-3 shadow">
        <Link to="/Bakery" className=" text-dark">
          <img src="/12.jpg" className="img-fluid" alt="" />
          <h4>Bakery Is Here</h4>
          <p>Price starts From : 39.99$ - 49.99$</p>
        </Link>
          </div>
      </div>

      <div className="row">
        
        <div className="col-3 m-3 shadow">
        <Link to="/Chinese" className=" text-dark">
          <img src="/13.jpg" className="img-fluid" alt="" />
          <h4>Chinese And Japanese Noodles</h4>
          <p>Price starts From : 09.99$ - 29.99$</p>
        </Link>
        </div>

          <div className="col-3 m-3 shadow">
        <Link to="/Italian" className=" text-dark">
          <img src="/14.jpg" className="img-fluid" alt="" />
          <h4>Italian Court</h4>
          <p>Price starts From : 49.99$ - 59.99$</p>
        </Link>
          </div>

          
          <div className="col-3 m-3 shadow">
        <Link to="/Boiled" className=" text-dark">
          <img src="/16.jpg" className="img-fluid" alt="" />
          <h4>Boil And Boild Soup</h4>
          <p>Price starts From : 4.99$ - 9.99$</p>
        </Link>
          </div>

      </div>

    </div>
    </>
  )
  }
  export default Catagory;