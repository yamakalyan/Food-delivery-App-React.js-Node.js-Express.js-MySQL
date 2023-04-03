import React, { useState } from "react";
import Header from "../Header";

function Update() {
const token = localStorage.getItem('token')
const [name, setname] = useState('')
const [email, setEmail] = useState('')
const [password, setPasword] = useState('')
const [mobile, setMObile] = useState('')
const [updateMsg, setUpdateMsg] = useState('')
const [updateINfo, setUpdateInfo] = useState(false)

const nameInput =(e)=>{
  setname(e.target.value)

}

const mobileInput =(e)=>{
  setMObile(e.target.value)

}

const emailInput =(e)=>{
  setEmail(e.target.value)

}

const passwordInput =(e)=>{
  setPasword(e.target.value)

}

const updateDetails =(e)=>{
  e.preventDefault()

  let update = {
    user_name : name,
    user_mobile : mobile,
    user_email : email,
    user_password : password
  }

  let options = {
    method : 'PUT',
    headers : {'content-type' : 'application/json', 'kalyan_header_key': token},
    body : JSON.stringify(update)
  }

  fetch('http://localhost:3120/user/update/', options)
  .then(response =>response.json())
  .then(data =>{
    if (data.server) {
      setUpdateInfo(data.server)
      setUpdateMsg(data.message)
    } else {
      setUpdateInfo(data.server)
      setUpdateMsg(data.message)
    }
  })
}
  return (
    <>
    <Header/>
    <div className="container">
        <form onSubmit={updateDetails}>
        <h1 className="text-center">Update Details</h1>
        <h2 className="text-center">{updateINfo ? updateMsg : updateMsg}</h2>
      <div className="row m-5">

    <div className="input-group mb-3">
        <div className="input-group-prepend">
         <span className="input-group-text" id="basic-addon1">Name :</span>
       </div>
     <input type="text" className="form-control" onChange={nameInput} placeholder="Name" required />
     </div>

    <div className="input-group mb-3">
        <div className="input-group-prepend">
         <span className="input-group-text" id="basic-addon1">Mobile :</span>
       </div>
     <input type="number" className="form-control" onChange={mobileInput} placeholder="Mobile" required />
     </div>

    <div className="input-group mb-3">
        <div className="input-group-prepend">
         <span className="input-group-text" id="basic-addon1">Email :</span>
       </div>
     <input type="text" className="form-control" onChange={emailInput} placeholder="@gmail.com" required />
     </div>

    <div className="input-group mb-3">
        <div className="input-group-prepend">
         <span className="input-group-text" id="basic-addon1"><b>Enter Password to confirm :</b></span>
       </div>
     <input type="text" className="form-control" onChange={passwordInput} placeholder="Password" required />
     </div>

      <button className="btn btn-primary btn-lg btn-block" type="submit">UPDATE</button>

      </div>  
      </form>
    </div>
    </>
  )
}

export default Update
