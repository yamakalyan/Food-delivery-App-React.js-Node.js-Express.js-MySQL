import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'

function SelectAddress() {
    let navigator = useNavigate();
    const token = localStorage.getItem('token')
    let params = useParams();
    const [showAddress, setShowAddress] = useState([])

    useEffect(()=>{
      let options = {
        method : 'GET',
        headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
      }
          fetch(`http://localhost:3120/address/userId`, options)
          .then(response =>response.json())
          .then(data =>{
            if (data.server) {
              setShowAddress(data.results)
            } else {
              setShowAddress(data.results)
              navigator('/AddAddress')
            }
          })
      
    }, [navigator, token])

    let mapping = showAddress.map((address, ad)=>{
      return(
        <>
        <div className='col-8 p-2' key={ad}>
            <div className="text-center">
            <h4> {address.permanant_address} 
             </h4>
            </div> <br/>
          </div>
          <div className='col-1 m-auto'>
             <button className='btn btn-primary sm' onClick={()=>{
                  const orderCreatingOptions = {
                    method : 'POST',
                    headers : {'content-type' : 'application/json', "kalyan_header_key" : token},
                    body : JSON.stringify({
                      food_id : params.id,
                      address_id : address.address_id
                    })
                  }
                  fetch('http://localhost:3120/order/create', orderCreatingOptions)
                  .then(response =>response.json())
                  .then(data =>{
                    if (data.server) {
                      navigator(`/OrderCreate`)
                    } else {
                      console.log("order not created")
                    }
                  })
             }}>Select</button>
          </div>
        </>
      )
    })

  return (
    <>
      <Header/>
      <div className='container shadow m-auto'>
      <h2 className='text-center text-primary m-3 p-2'>Address</h2><hr/>
        <div className='row m-5 '>

          {mapping}
        </div>
      </div>
    </>
  )
}

export default SelectAddress
