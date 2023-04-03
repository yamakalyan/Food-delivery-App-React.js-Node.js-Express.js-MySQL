import React, { useEffect, useState } from "react";
import Header from "../Header";
import { IoReloadOutline } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";

const Orders =()=>{
  const navigator = useNavigate()
  const token = localStorage.getItem('token')
  const [loadOrders, setloadOrders] = useState([]);
  const [foodItemLoad, setFooditemLoad] = useState(false)

useEffect(()=>{

  let fetching  = async ()=>{
    let options = {
      method :'GET',
      headers : {'content-type' : 'application/json', 'kalyan_header_key' : token}
    }
    
   await fetch(`http://localhost:3120/order/orderlist`, options)
    .then(response => response.json())
    .then(data => {
      if (data.server) {
        setFooditemLoad(data.server)
        setloadOrders(data.results)
      } else {
        setFooditemLoad(data.server)
        setloadOrders(data.results)
      }
    })
  }
  return ()=> fetching()
}, [token])

const mapping = loadOrders?.map((order, or)=>{
  return(
    <div className="col-12 m-1 nav-link p-3 border border-dark" key={or}>
          <h2>{order.foodResults[0]?.food_name}</h2><hr/>
          <p>{order?.order_time}</p>
          <p>Address :{order.addressResults[0]?.permanant_address}</p>
          <h4> Total amount : {order.foodResults[0]?.food_amount} 
          <button className="btn btn-outline-dark float-right sm" 
          onClick={()=>navigator(`/SelectAddress/${order.foodResults[0]?.food_id}`)}><IoReloadOutline /></button>
          </h4>
        </div>
  )
})
  return(
    <>
    <Header/>
    <div className="container">
      <h1 className="text-center text-primary">Previous orders</h1><hr/>
      {foodItemLoad ?
    <div className="row">
      {mapping}
      </div>  
      :
      <>
        <h1 className="text-center">You have no orders</h1>
      </>
}
    </div>
    </>
  )
}

export default Orders