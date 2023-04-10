import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import About from "../About";

const Catagory =()=>{ 
const navigator = useNavigate();

  return(
    <>
    <Header/>
    <div className="container-fluid"> 
    <div className="row">

    <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/50.2.jpg" className="img-fluid" alt="" />
        <h4>Offer Zone</h4>
        <h4> 50% off on orders</h4>
        <button className="btn btn-primary" onClick={()=>navigator('/SeaFood')}>view more</button>
         </div>

      <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/veg.jpg" className="img-fluid" alt="" />
        <h4>Veg-Starters</h4>
        <h4>Price starts From : Rs 199 - 299</h4>
        <button className="btn btn-primary" onClick={()=>navigator(`/Veggies`)}>view more</button>
      </div>

        <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/12.jpg" className="img-fluid" alt="" />
        <h4>Bakery Is Here</h4>
        <h4>Price starts From : Rs 49 - 199</h4>
        <button className="btn btn-primary" onClick={()=>navigator('/Baker')}>view more</button>
        </div>
      <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/13.jpg" className="img-fluid" alt="" />
        <h4>Non-veg And much more</h4>
        <h4>Price starts From : Rs 399 - 499</h4>
        <button className="btn btn-primary" onClick={()=>navigator('/NonVeg')}>view more</button>
      </div>
     
        <div className="col-md-4 col-lg-2 col-sm-5 m-3 p-3 shadow">
        <img src="/fish.jpg" className="img-fluid" alt="" />
        <h4>SeaFood and More</h4>
        <h4>Price starts From : Rs 155 - 299</h4>
        <button className="btn btn-primary" onClick={()=>navigator('/SeaFood')}>view more</button>
         </div>
        </div>
</div>
<About/>
    </>
  )
  }
  export default Catagory;