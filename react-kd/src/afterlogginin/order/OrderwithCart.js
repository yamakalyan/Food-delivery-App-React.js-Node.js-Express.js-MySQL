import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {MdDeleteForever} from 'react-icons/md'
import Header from '../Header'
import '../login.css'

function OrderwithCart() {
    const token = localStorage.getItem('token')
    const params = useParams()
    const [viewAddress, setViewAddress] = useState('')
    const [user, setuser] = useState('')
    const [amt, setAmt] = useState(0)
    const [total, setTotal] = useState('')
    const [Cart, setCart] = useState([])
    
    const [GetOrderId, setGetOrderid] = useState('')
    const [signiture, setSigniture] = useState('')
    const [rzpPaymentId, setRzpPaymentid] = useState('')

    // PAYMENT CREATION
    useEffect(()=>{
      const options = {
        method : 'GET',
        headers : {"Content-Type" : "application/json", "kalyan_header_key" : token}
      }
      fetch("http://localhost:3120/cart/total", options)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
          setCart(data.Cart)
          setTotal(data.cartTotal)
        } else {
          alert("cannot get cart details")
        }
      })
    }, [])

    // USER DETAILS FETCHING
    useEffect(()=>{
      const options ={
        method : "GET",
        headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
      }
      fetch('http://localhost:3120/user/user', options)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
          setuser(data.user)
        } else {
          alert("user details failed to load")
        }
      })
    }, [token])

    // PARAMS ADDRESS FETCHING
    useEffect(()=>{
    
      fetch(`http://localhost:3120/address/address/${params.aid}`)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
          setViewAddress(data.results)
        } else {
          alert("address failed to load")
        }
      })
    }, [params.aid])

    const paymentCreation =()=>{

      const options = {
        method  :'POST',
        headers : {'content-type' : 'application/json', 'kalyan_header_key' : token},
        body : JSON.stringify({
          amount : total
        })
      }
      fetch('http://localhost:3120/payment/create', options)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
            setGetOrderid(data.results.id)
            setAmt(data.results.amount)
            paymentOptions()
        } else {
            alert("payment failed to create")
        }
      })
    }

  const paymentOptions =()=>{
      const options = {
          key : process.env.Razor_secret_key, 
          amount : amt, 
          currency : "INR",
          name : "Kwality Delivery",
          description : "Test Transaction",
          image : "https://example.com/your_logo",
          order_id : GetOrderId,
          handler : function (response){
              setRzpPaymentid(response.razorpay_payment_id);
              setGetOrderid(response.razorpay_order_id);
              setSigniture(response.razorpay_signature)
          },
          prefill : {
              name: user[0]?.user_name,
              email: user[0]?.user_email,
              contact: user[0]?.user_mobile
          },
          notes : {
              address: viewAddress[0]?.permanant_address
          },
          theme : {
              "color": "#3399cc"
          }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
  }

  const mapping = Cart?.map((cart, k)=>{
    return(
      <div key={k}>
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

        }}><MdDeleteForever/></button>
        <h5>Food Name : {cart.foodDetails[0]?.food_name}</h5>
        <p> Quantity : {cart.cart_quantity} </p>
        <h5>Food Amount : {cart.foodDetails[0]?.food_amount} <span className='float-right'>Total Amount : {cart.total}</span></h5><hr/><br/>
        {/* <h5>Total Amount : {cart.total} </h5> */}
      </div>
    )
  })

  return (
    <>
    <Header/>
    <div className='container'>
        <div className='row m-5 p-3  border border-info shadow'>
            <div className='col'>
          <h2 className='text-primary text-center'>Ordering Details</h2><hr/>
              {mapping}
              <h5>Address : {viewAddress[0]?.permanant_address}</h5><br/>
          <h3 className='text-primary p-3 float-right'> Cart Total Amount : {total}
           </h3>
            </div>
          <button className='btn btn-success btn-lg btn-block' onClick={()=>paymentCreation()}>Confirm and Pay</button>
        </div>
    </div>
      
    </>
  )
}

export default OrderwithCart
