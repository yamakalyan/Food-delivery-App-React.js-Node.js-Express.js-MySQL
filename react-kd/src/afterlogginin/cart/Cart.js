import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header"
import { MdDeleteForever} from 'react-icons/md'
import '../login.css'
import { RiSubtractFill } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import About from "../../About";

const Cart =()=>{
  const navigator = useNavigate()
  const token = localStorage.getItem('token')
  const [msg, setMsg] = useState('')
  const [showCartItem, setShowcartItem] = useState([])
  const [total, setTotal] = useState('')


  useEffect(()=>{
    const fetchingCart =()=>{
      let options = {
        method : 'GET',
        headers : {'content-type' : 'application/json', 'kalyan_header_key' : token}
      }
      fetch(`http://localhost:3120/cart/total`, options)
      .then(response => response.json())
      .then(data => {
        if (data.server) {
          setShowcartItem(data.Cart)
          setTotal(data.cartTotal)
          setMsg(data.message)
        } else {
          setShowcartItem(data.Cart)
          setTotal(data.cartTotal)
          setMsg(data.message)
        }
      })
    }
    return ()=> fetchingCart()
  }, [token])

      var mapping = showCartItem?.map((cart, c)=>{
        return(
       <div className="col-sm-12 border p-3 border-dark m-3" key={c}>
         <div className="">
        <h2>{cart.foodDetails[0].food_name}<span className="float-right">
          <button className='btn btn-outline-danger float-right' onClick={()=>{
          window.location.reload(false)
          const options = {
            method : "DELETE",
            headers : {"content-type" : "application/json", "kalyan_header_key" : token},
            body : JSON.stringify({
              food_id : cart.foodDetails[0]?.food_id
            })
          }
          fetch("http://localhost:3120/cart/food/remove", options)
          .then(response =>response.json())
          .then(data =>data.server)
        }}><MdDeleteForever/></button></span></h2><hr/>
        <p>{cart.foodDetails[0].food_type}</p>
        <p className="float-left">{cart.foodDetails[0].food_description}</p>
        <div className="cartQuantity-input">
          <p>
          <button className="minus" 
               onClick={()=>{
                 window.location.reload(false)
                 let options = {
                   method : 'PUT',
                   headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
                  }
                  fetch(`http://localhost:3120/cart/minus/${cart.cart_food_id}`, options)
                  .then(response =>response.json())
                  .then(data => data.server)
                }}><RiSubtractFill /></button>
               <input className="cartInput " type="number" readOnly value={cart.cart_quantity}/>
               
                <button className="plus" onClick={()=>{
          window.location.reload(false)
          let options = {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
            }
            fetch(`http://localhost:3120/cart/quantity/${cart.cart_food_id}`, options)
            .then(response =>response.json())
            .then(data => data.server)}} >
               <AiOutlinePlus/> </button>
          </p>
        </div>
        <h3> Total : {cart.total} </h3>
         </div>
      </div>
     )
    })
  return(
    <>
    <Header/>
    <div className="container-fluid">

     <h1 className="text-center text-primary">{msg}</h1><hr/>

    <div className="container">
      <div className="row"> {mapping} </div>
    </div>
      </div>
    <section className="box">
      <div className="cart border border-dark p-2">
     <h1 className="total-text"> Total Amount : {total} </h1>
      <button className="move-address-button" onClick={()=>navigator(`/SelectAddressforCart`)}>Move to Address</button>
      </div>
    </section>
    <About/>
    </>
  )
}
export default Cart