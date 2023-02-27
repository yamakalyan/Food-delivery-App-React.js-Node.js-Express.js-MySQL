import React, { useEffect, useState } from "react";
import Header from "../afterlogginin/Header";

const Orders =()=>{
  const [viewOrders, setviewOrders] = useState(false);
  const [loadOrders, setloadOrders] = useState([]);

  useEffect(()=>{
    const loadApi = async()=>{
      await fetch('http://localhost:3120/order/list/')
      .then(response =>response.json())
      .then(data => setloadOrders(data.results))
    }
    loadApi();
    setviewOrders(true)
  }, [])

  const mappingData = loadOrders.map((order, oo)=>{
    return(
      <div className="container" key={oo}>
      <div className="row">
        <div className="col-4">
          <h1>Orders</h1><hr/>
          <p>{order.order_quantity}</p>
          <p>{order.user_id}</p>
          <p>{order.food_id}</p>
          <p>{order.address_id}</p>
          <p>{order.order_amount}</p>
        </div>
      </div>
    </div>
    )
  })
  return(
    <>
    <Header/>
    {viewOrders ? 
    mappingData
    :
    
      <div>
        <h1>loading.....</h1>
      </div>

    }
    </>
  )
}

export default Orders