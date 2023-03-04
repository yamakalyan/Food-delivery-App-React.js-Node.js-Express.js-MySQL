import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const Cart =()=>{
  let params = useParams();
  let navigator = useNavigate();
  const [viewFoodItem, setViewFooditem] = useState('');

  useEffect(()=>{
    fetch(`http://localhost:3120/food/${params.id}`)
    .then(response => response.json())
    .then(data => {
      if (data.server) {
        setViewFooditem(data.results)
      } else {
        setViewFooditem(data.results)
      }
    })
  },[params])
  return(
    <>
    <Header/>
    <div className="container">
      <h1>Added to cart</h1>
    {viewFoodItem ? 
  
      <div className="col-6 shadow m-3 p-3">
        <h1>{viewFoodItem[0].food_name}</h1>
        <p> {viewFoodItem[0].food_type} </p>
        <h2>Price : ₹ {viewFoodItem[0].food_amount} </h2>
        <div className="container d-flex justify-content-end">
        <button className="btn btn-primary" onClick={()=>navigator('/payments')}>Place Order</button>
        </div>
      </div>
  :
      <div className="container">
     <div className="text-center">
  <div className="spinner-border m-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
    </div>
}
    </div>
    </>
  )
}
export default Cart