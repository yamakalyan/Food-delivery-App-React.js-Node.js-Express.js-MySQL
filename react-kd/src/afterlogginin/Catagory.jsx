import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Catagory =()=>{ 
const navigator = useNavigate();
  return(
    <>
    <Header/>
    <div className="container-fluid">

      <div className="row">

        <div className="col-2 m-3 shadow">
          <img src="/veg.jpg" className="img-fluid" alt="" />
          <h4>Veg-Starters</h4>
          <p>Price starts From : Rs : 199 - 299</p>
          <button className="btn btn-primary" onClick={()=>navigator('/Veggies')}>view more</button>
        </div>

          <div className="col-2 m-3 shadow">
          <img src="/12.jpg" className="img-fluid" alt="" />
          <h4>Bakery Is Here</h4>
          <p>Price starts From : Rs : 49 - 199</p>
          <button className="btn btn-primary" onClick={()=>navigator('/Baker')}>view more</button>
          </div>
        <div className="col-2 m-3 shadow">
          <img src="/13.jpg" className="img-fluid" alt="" />
          <h4>Non-veg And much more</h4>
          <p>Price starts From : Rs : 399 - 499</p>
          <button className="btn btn-primary" onClick={()=>navigator('/NonVeg')}>view more</button>
        </div>
       
          <div className="col-2 m-3 shadow">
          <img src="/fish.jpg" className="img-fluid" alt="" />
          <h4>SeaFood and More</h4>
          <p>Price starts From : Rs : 155 - 299</p>
          <button className="btn btn-primary" onClick={()=>navigator('/SeaFood')}>view more</button>
           </div>
          </div>
    </div>
    </>
  )
  }
  export default Catagory;