import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [number, setnumber] = useState("");
  const [passwod, setpassword] = useState("");

  const nameInput = (event)=>{
    setname(event.target.value);
  }

  const mailInput=(event)=>{
    setmail(event.target.value)
  }

  const numberInput = (event)=>{
    setnumber(event.target.value)
  }

  const passwordInput =(event)=>{
    setpassword(event.target.value);
  }

  const saveInputValues = (event)=>{
    
    event.preventDefault();

    let newRegistration = {
      Username : name,
      Email : mail,
      Mobile : number,
      Passwod : passwod
    }
    console.log(newRegistration);
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
        <form action="/action_page.php" onSubmit={saveInputValues}>
        <div className="form-group">
        <input type="name" className="form-control bg-dark text-light" onChange={nameInput} id="name" placeholder="Enter UserName"/>
        </div>
        <div className="form-group">
        <input type="email" className="form-control bg-dark text-light" onChange={mailInput} id="email" placeholder="Enter @gmail.com"/>
        </div>
        <div className="form-group">
        <input type="number" className="form-control bg-dark text-light" onChange={numberInput} id="number" placeholder="Enter Mobile Number"/>
        </div>
        <div className="form-group">
        <input type="password" className="form-control bg-dark text-light" onChange={passwordInput} id="pwd" placeholder="Enter password"/>
        </div><hr />
        <div className="row">
          <div className="col mb-2">
            <small>Already Registered ? <Link to="/login">login</Link></small>
          </div>
          <div className="col">
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
            </div>
            </div>
        </div>
        </>
  )
}

export default Register