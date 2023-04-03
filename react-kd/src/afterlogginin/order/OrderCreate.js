import React, {useEffect, useState} from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'

function OrderCreate() {
  const token = localStorage.getItem('token')
  const [orderDetails, setOrderDetails] = useState([])
  const [takingOrderId, setTakingOrderId] = useState('')
  const [user, setuser] = useState('')
  const [orderId, setOrderId] = useState('')
  const [truePayment, settruePayment] = useState(false)
  const [verifyPayment, setVerifyPayment] = useState(false)
  const [rzpSignature, setRzpSignature] = useState('')
  const [rzpPaymentId, setRzpPaymentID] = useState('')
  const [Amount, setAmount] = useState(0)
  const navigator = useNavigate()

  useEffect(()=>{

    const orderCreatingOptions = {
      method : 'GET',
      headers : {'content-type' : 'application/json', "kalyan_header_key" : token},
    }
    fetch('http://localhost:3120/order/orderdetails', orderCreatingOptions)
    .then(response =>response.json())
    .then(data =>{
      if (data.server) {
        setOrderDetails(data.orderResults)
      } else {
        console.log("order not created")
      }
    })
  }, [token])

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

  const makingStatesEmpty = ()=>{
    setVerifyPayment(false)
    setRzpPaymentID('')
    setRzpSignature('')
    setTakingOrderId('')
  }
  const handlePaymentCreation=(Oid, Amt)=>{
    setOrderId(Oid)
    const options = {
      method : 'POST',
      headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token},
      body : JSON.stringify({
        order_id : Oid,
        amount : Amt
      })
    }
    fetch('http://localhost:3120/payment/create', options)
    .then(response =>response.json())
    .then(data=>{
      if (data.server) {
        setTakingOrderId(data.sendingValues.payorder_id)
        setAmount(data.sendingValues.amount)
        settruePayment(true)
      } else {
        alert('Payment creation failed')
      }
    })
  }
if (truePayment) {

  const options = {
    key : process.env.Razor_secret_key, 
    amount : Amount, 
    currency : "INR",
    name : "Kwality Delivery",
    description : "Test Transaction",
    image : "",
    order_id : takingOrderId,
    handler : function (response){
        setRzpPaymentID(response.razorpay_payment_id);
        setTakingOrderId(response.razorpay_order_id);
        setRzpSignature(response.razorpay_signature);
        setVerifyPayment(true);
    },
    prefill : {
        name: user[0]?.user_name,
        email: user[0]?.user_email,
        contact: user[0]?.user_mobile,
        orderId : orderId
    },
    notes : {
        address: 'hyderabad'
    },
    theme : {
        "color": "#3399cc"
    }
}
  const rzp = new window.Razorpay(options)
      rzp.open()
}
const verifyingPayment =()=>{
  const options = {
    method : 'PUT',
    headers : {'content-type' : 'application/json', 'x-razorpay-signature' : rzpSignature},
    body : JSON.stringify({
      order_id : takingOrderId,
      razorpay_payment_id : rzpPaymentId,
      order_food_id : orderId
    })
  }
  fetch('http://localhost:3120/payment/success/verify', options)
  .then(response =>response.json())
  .then(data =>{
    if (data.server) {
      alert(data.message)
      makingStatesEmpty()
      navigator('/Orders')
      window.location.reload(false)
    } else {
      alert(data.message)
    }
  })
}

if (verifyPayment) {
  verifyingPayment()
}


  const mapping = orderDetails?.map((order, o)=>{
    return(
      <div key={o}>
         <h6>Food Name : {order.food[0].food_name} <span className='float-right'></span> </h6>
          <h6>Food Quantity : 1<span className='float-right'>Food Amount : {order.food[0].food_amount}</span> </h6>
          <h6>Address : {order.address[0].permanant_address} </h6>
          <h6>Food Quantity : {order.order_quantity}<span className='float-right'>Tax : CGST + SGST : {order.tax} rs</span> </h6>
          <h6><span className='float-right'>Charges : {order.charges} rs</span> </h6>
          <h4 className='text-center p-3 m-3'>Total Amount : {order.Total[0].Total}
          <button className='btn btn-success float-right' onClick={()=>handlePaymentCreation(order.order_id, order.Total[0].Total )}>Pay</button>
          </h4>
      </div>
    )
  })
  return (
    <>
    <Header/>
    <div className='container'>
      <div className='row border border-dark m-5'>
        <div className='col-md col-sm col-lg p-3'>
          <h1 className='text-success text-center'>Confirm And Pay</h1><hr/>
         {mapping}
        </div>
      </div>
    </div>
    </>
  )
}

export default OrderCreate