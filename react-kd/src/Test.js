import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './afterlogginin/Header'

function Test() {
const params = useParams()
const navigator = useNavigate()
const token = localStorage.getItem('token')
const [orderCreate, setOrderCreate] = useState('')
const [orderCreateMsg, setOrderCreateMsg] = useState('')

useEffect (()=>{

  var creationRequiredBody = {
    food_id : 1234,
    address_id : "hyderabad"
  }
  var options = {
    method : "POST",
    headers : {'content-type' : 'application/json', "kalyan_header_key" : token},
    body : JSON.stringify(creationRequiredBody)
  }
  fetch('http://localhost:3120/order/create/', options)
  .then(response =>response.json())
  .then(data =>{
    if (data.server) {
      setOrderCreate(data.server) 
      setOrderCreateMsg(data.message) 
    } else {
      setOrderCreate(data.server)
      setOrderCreateMsg(data.message) 
    }
  })
},[token])

  return (
    <div>
        <Header/>
      <div className='container'>
        <h1>
          {orderCreate ? orderCreateMsg : orderCreateMsg }
          </h1>
      </div>
    </div>
  )
}

export default Test
