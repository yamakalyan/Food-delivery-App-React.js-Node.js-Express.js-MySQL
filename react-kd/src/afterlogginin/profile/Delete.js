import React, {useState, useEffect} from 'react'
import Header from '../Header'
import { useNavigate, useParams } from 'react-router-dom';

function Delete() {
let params = useParams();
const navigator = useNavigate();
let token = localStorage.getItem('token')
let [authorizedUser, setAuthorizedUser] = useState(false)
let [authorizedUserdetails, setAuthorizedUserDetails] = useState('');
let [userDelete, setUserDelete] = useState(false)
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
        console.log(authorizedUserdetails[0].user_id)
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
        setUserDelete(data.server)
        navigator('/Login')
        localStorage.removeItem('token')
        console.log(authorizedUserdetails[0].user_id)
      } else {
        setUserDelete(data.server)
        setUserdeletemsg(data.message)
      }
    })

  }
}
return (
  <>
    <Header/>
      <div className='container'>
      <div className='row m-5'>
        <div className='col-10 m-5 shadow p-5'>
        <h2 className='text-center'>Delete Page</h2><hr/>
        {authorizedUser ? deleteMsg : deleteMsg}
          <form onSubmit={deleteData}>
      <div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">user Email</span>
  </div>
  <input type="text" className="form-control"  onChange={emailChange} placeholder="UserEmail" aria-label="UserEmail" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">User Password</span>
        </div>
        <input type="text" className="form-control" onChange={passwordChange} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
      </div>
        <button type="submit" className="btn btn-danger btn-lg btn-block">Delete</button>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export default Delete
