import React from 'react'
import Header from '../Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddAddress() {
  let navigator = useNavigate();
  const token = localStorage.getItem('token')
  const [permanantAdd, setPermanantAdd] = useState('')
  const [addressCreate, setAddresscreate] = useState(false)
  const [addressMsg, setAddressmsg] = useState('')

  const permanantAddress =(e)=>{
      setPermanantAdd(e.target.value)
  }

  let addAddress =(e)=>{
      e.preventDefault()

      let address = {
          permanant_address : permanantAdd,
          address_status : "deliverable"
      }
          let options = {
              method : 'POST',
              headers : {'content-type' : 'application/json', 'kalyan_header_key' : token},
              body : JSON.stringify(address)
          }
          fetch('http://localhost:3120/address/create/', options)
          .then(response =>response.json())
          .then(data =>{
              if (data.server) {
                  setAddresscreate(data.server)
                  setAddressmsg(data.message)
                  navigator('/Address')
              } else {
                  setAddresscreate(data.server)
                  setAddressmsg(data.message)
              }
          })
          
      
  }
  return (
    <>
    <Header/>
    <div className='container'>
        <div className='container'>
        <div className='row m-5'>
          <div className='col-10 m-5 shadow p-5'>
          <h2 className='text-center'>Add new address</h2><hr/>
          {addressCreate ? addressMsg : addressMsg}
            <form onSubmit={addAddress}>  
            <div className="input-group">
            <textarea className="form-control" onChange={permanantAddress} placeholder='Permanant address' aria-label="With textarea"></textarea>
            </div> <br/>
          <button type="submit" className="btn btn-success btn-lg btn-block">Enter</button>
            </form>
          </div>
        </div>
        </div> 
      </div>     
    </>
  )
}

export default AddAddress
