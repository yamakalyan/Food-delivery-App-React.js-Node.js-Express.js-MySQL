import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Login =()=>{

    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");

    const saveValue = (event)=>{

        setmail(event.target.value);
    }

    const savePass =(event)=>{
        setpass(event.target.value);
    }

    const submitData=(event)=>{
        event.preventDefault();

        let newUser = {
            username : mail,
            password : pass
        }
        console.log(newUser)
    }
    return(
        <>
        <Navbar/>
        <div className="container p-3 mt-4 bg-light shadow">
            <div className="row">
                <div className="col-md-4 mb-2">
                    <img className="img-fluid" src="/login.png" alt="" />
                </div>
            <div className="col-md-6 mb-2 p-5 rounded my-auto shadow bg-dark text-light">
                <div className="text-center mb-2 m">
                    <h5><b>Login</b></h5><hr />
        <form action="/action_page.php" onSubmit={submitData}>
        <div className="form-group">
        <input type="email" className="form-control bg-dark" id="email" onChange={saveValue} placeholder="Enter username/@gmail.com"/>
        </div>
        
        <div className="form-group">
        <input type="password" className="form-control bg-dark" id="pwd" onChange={savePass} placeholder="Enter password"/>
        </div>
        <div className="row">
            <div className="col">
        <small>New Account ? <Link to='/Register'>Register</Link></small> 
            </div>
            <div className="col mb-4">
        <small><Link to="/forgetpasword">Forget Password ?</Link></small>
            </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
        </form>
        </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Login;