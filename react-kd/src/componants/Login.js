import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Login =()=>{
    const [userLogin, setUserlogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailInput=(e)=>{
        setEmail(e.target.value)
    }
    const passwordInput =(e)=>{
        setPassword(e.target.value)
    }

    const loginUserSubmit =(e)=>{
        e.preventDefault();

        let loginUser = {
            username : email,
            userpassword : password 
        }

        const options = {
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(loginUser)
        }

        fetch('http://localhost:3120/user/login/', options)
        .then(response => response.json())
        .then(data => 
            {setUserlogin(data.server);
                console.log(data.token)
            }
        )
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
                    <p>{userLogin}</p>
        <form action="/action_page.php" onSubmit={loginUserSubmit}>
        <div className="form-group">
        <input type="email" className="form-control bg-dark text-light" onChange={emailInput} id="email" placeholder="Enter username/@gmail.com"/>
        </div>
        
        <div className="form-group">
        <input type="password" className="form-control bg-dark text-light" id="pwd" onChange={passwordInput} placeholder="Enter password"/>
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