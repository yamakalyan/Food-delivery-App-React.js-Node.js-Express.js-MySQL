import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'

function Address() {
    let navigator = useNavigate();
    const token = localStorage.getItem('token')
    const [DeleteAddress, setDeleteAddress] = useState(false)
    const [DeleteAddressMsg, setDeleteAddressMsg] = useState('')
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
      
    }, [])

    const deleteAddress =()=>{
      let options = {
        method : 'DELETE',
        headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
      }
      fetch(`http://localhost:3120/address/delete/`, options)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
          setDeleteAddress(data.server)
          setDeleteAddressMsg(data.message)
        } else {
          setDeleteAddress(data.server)
          setDeleteAddressMsg(data.message)
        }
      })
    }

    let mapping = showAddress.map((address, ad)=>{
      return(
        <div className='col-10 m-5 shadow p-5' key={ad}>
          <h2 className='text-center text-primary'>Address</h2><hr/>
            <div className="text-center">
            <h1> {address.permanant_address} <small></small><button className='btn btn-primary sm mr-1' onClick={()=>navigator('/EditAddress')}>Edit</button>
             <button className='btn btn-primary sm mr-1' onClick={deleteAddress}>Delete</button></h1><br/>
            </div> <br/>
          </div>
      )
    })

  return (
    <>
      <Header/>
      <div className='container'>
        <div className='row m-5'>
          {DeleteAddress ? DeleteAddressMsg : DeleteAddressMsg}
          {mapping}
        </div>
      </div>
    </>
  )
}

export default Address
