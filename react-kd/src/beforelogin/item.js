import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Item =()=>{ 
const navigator = useNavigate();

  return(
    <>
    <Navbar/>
    <div className="container-fluid"> 
    <div className="row">

    <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <h4> 50% off on orders</h4>
        <h5>Offer Zone</h5>
        <img src="/50.2.jpg" className="img-fluid" alt="" />
          <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary sm" onClick={()=>navigator('/')}>view more</button>
          </div>
         </div>

      <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/veg.jpg" className="img-fluid" alt="" />
        <h4>Veg-Starters</h4>
        <h4>Price starts From : Rs 199 - 299</h4>
        <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary" onClick={()=>navigator(`/Veg`)}>view more</button>
        </div>
      </div>

        <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/12.jpg" className="img-fluid" alt="" />
        <h4>Bakery Is Here</h4>
        <h4>Price starts From : Rs 49 - 199</h4>
        <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary" onClick={()=>navigator('/Bakery')}>view more</button>
        </div>
        </div>
      <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/13.jpg" className="img-fluid" alt="" />
        <h4>Non-veg And much more</h4>
        <h4>Price starts From : Rs 399 - 499</h4>
        <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary" onClick={()=>navigator('/Chinese')}>view more</button>
        </div>
      </div>
     
        <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/fish.jpg" className="img-fluid" alt="" />
        <h4>SeaFood and More</h4>
        <h4>Price starts From : Rs 155 - 299</h4>
        <div className="d-flex justify-content-end align-items-end">
        <button className="btn btn-primary" onClick={()=>navigator('/Boiled')}>view more</button>
        </div>
         </div>
        </div>
</div>
    </>
  )
  }
  export default Item;