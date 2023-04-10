import React, {useState, useEffect} from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import About from '../../About';

function Delete() {
const navigator = useNavigate();
let token = localStorage.getItem('token')
let [authorizedUser, setAuthorizedUser] = useState(false)
let [authorizedUserdetails, setAuthorizedUserDetails] = useState('');
let [deleteMsg, setUserdeletemsg] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

useEffect(()=>{
  if (token === null || undefined) {
    localStorage.removeItem('token')
    navigator('/Login')
  } else {
    let options = {
      method : 'POST',
      headers : {'content-type' : 'application/json', 'kalyan_header_key' : token}
    }
    fetch('http://localhost:3120/user/auth/', options)
    .then(response => response.json())
    .then(data => {
      if (data.server) {
        setAuthorizedUser(data.server)
        setAuthorizedUserDetails(data.user)
      } else {
        localStorage.removeItem('token')
        navigator('/Login')
        setAuthorizedUser(data.server)
        setAuthorizedUserDetails(data.user)
      }
    })
  }
}, [navigator, token])

const emailChange =(e)=>{
  setEmail(e.target.value)
}
const passwordChange =(e)=>{
  setPassword(e.target.value)
}

const deleteData =(e)=>{
  e.preventDefault()

  if (authorizedUser) {
    
    var deleteUser = {
      user_email : email,
      user_password : password
    }
    
    let options = {
      method : 'DELETE',
      headers : {'content-type' : 'application/json', 'kalyan_header_key' : token},
      body : JSON.stringify(deleteUser)
    }
    fetch(`http://localhost:3120/user/delete/${authorizedUserdetails[0].user_id}`, options)
    .then(response => response.json())
    .then(data =>{
      if (data.server) {
        navigator('/Login')
        localStorage.removeItem('token')
      } else {
        setUserdeletemsg(data.message)
      }
    })

  }
}
return (
  <>
    <Header/>
      <div className='container'>
      <div className='row mt-5'>
        <div className='col-md col-10 m-5 shadow p-5'>
        <h2 className='text-center'>Delete Page</h2><hr/>
        {authorizedUser ? deleteMsg : deleteMsg}
          <form onSubmit={deleteData}>
      <div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text">user Email</span>
  </div>
  <input type="text" className="form-control"  onChange={emailChange} placeholder="UserEmail" />
      </div>

      <div className="input-group mb-3">
        <div className="input-group-append">
          <span className="input-group-text">User Password</span>
        </div>
        <input type="text" className="form-control" onChange={passwordChange} placeholder="Password"/>
      </div>
        <button type="submit" className="btn btn-danger btn-lg btn-block">Delete</button>
          </form>
        </div>
      </div>
      </div>
      <About/>
    </>
  )
}

export default Delete
