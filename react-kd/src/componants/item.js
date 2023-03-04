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

        <div className="col-2 m-3 shadow">
          <img src="/19.jpg" className="img-fluid" alt="" />
          <h4>Veg-Starters</h4>
          <p>Price starts From : 19.99$ - 29.99$</p>
          <div className="container d-flex justify-content-end">
          <button className="btn btn-primary m-3" onClick={()=>navigator('/Veg')}>view more</button>
          </div>
        </div>

          <div className="col-2 m-3 shadow">
          <img src="/12.jpg" className="img-fluid" alt="" />
          <h4>Bakery Is Here</h4>
          <p>Price starts From : 39.99$ - 49.99$</p>
          <div className="container d-flex justify-content-end">
            <button className="btn btn-primary m-3" onClick={()=>navigator('/Bakery')}>view more</button>
          </div>
          </div>

        <div className="col-2 m-3 shadow">
          <img src="/13.jpg" className="img-fluid" alt="" />
          <h4>Non-veg and More</h4>
          <p>Price starts From : 09.99$ - 29.99$</p>
          <div className="container d-flex justify-content-end">
            <button className="btn btn-primary m-3" onClick={()=>navigator('/Chinese')}>view more</button>
          </div>
        </div>
         
          <div className="col-2 m-3 shadow">
          <img src="/16.jpg" className="img-fluid" alt="" />
          <h4>SeaFood and More</h4>
          <p>Price starts From : 4.99$ - 9.99$</p>
          </div>
      </div>
    </div>
    </>
  )
  }
  export default Item;