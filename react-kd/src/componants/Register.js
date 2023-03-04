import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
  // const navigator = useNavigate();
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [registerUser, setRegisteruser] = useState('');
  const [msg, setMsg] = useState('');

  const nameInput = (event)=>{
    setname(event.target.value);
  }

  const numberInput = (event)=>{
    setnumber(event.target.value)
  }

  const mailInput=(event)=>{
    setmail(event.target.value)
    
  }

  const passwordInput =(event)=>{
    setpassword(event.target.value);
  }

  const saveInputValues = (event)=>{
    
    event.preventDefault();
    
    let register = {
      user_name : name,
      user_mobile : number,
      user_email : mail,
      user_password : password
    }
    
    const options = {
      method : 'POST',
      headers : {'content-type':'application/json'},
      body : JSON.stringify(register)
    }

    fetch('http://localhost:3120/user/register/', options)
    .then(response =>response.json())
    .then(data => {
      if (data.server === true) {
        setRegisteruser(data.results);
        setMsg(data.message) 
        // navigator('/Login')
      } else {   
        setRegisteruser(data.results);
        setMsg(data.message)
      }
      console.log(data.results)})
  }

  return (
        <>
      <Navbar/>
        <div className="container p-3 mt-4 shadow">
            <div className="row">
                <div className="col-md-4 mb-2">
                    <img className="img-fluid" src="/signup.png" alt="" />
                </div>
            <div className="col-md-6 mb-2 p-5 my-auto shadow bg-dark text-light rounded-lg">
                <div className="text-center mb-2 m">
                    <h5><b>Register</b></h5><hr />
                    {registerUser ? 
                 
                 <>{msg}</>  

                    :
                    <>{msg}</>
                  
                  }
                    
        <form onSubmit={saveInputValues}>
        <div className="form-group">
        <input type="text" className="form-control bg-dark text-light" onChange={nameInput} id="name" required placeholder="Enter UserName"/>
        </div>
        <div className="form-group">
        <input type="number" className="form-control bg-dark text-light" onChange={numberInput} id="number" required placeholder="Enter Mobile Number"/>
        </div>
        <div className="form-group">
        <input type="email" className="form-control bg-dark text-light" onChange={mailInput} id="email" required placeholder="Enter @gmail.com"/>
        </div>
        <div className="form-group">
        <input type="password" className="form-control bg-dark text-light" onChange={passwordInput} id="pwd" required placeholder="Enter password"/>
        </div><hr />
        <div className="row">
          <div className="col mb-2">
            <small>Already Registered ? <Link to="/login">login</Link></small>
          </div>
          <div className="col">
          </div>
        </div>
        <button type="submit" className="btn btn-success btn-lg btn-block">Sign-Up</button>
        </form>
        </div>
            </div>
            </div>
        </div>
        </>
  )
}

export default Register