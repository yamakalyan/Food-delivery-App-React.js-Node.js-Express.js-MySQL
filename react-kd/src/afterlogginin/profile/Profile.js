import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import About from '../../About.jsx'

function Profile() {
  const navigator = useNavigate()
  const [profile, setProfile] = useState([])
  const [img, setImg] = useState()
  const [user, setuser] = useState(false)
  const token = localStorage.getItem('token')
  
  useEffect(()=>{
    if (token === null || undefined) {
      localStorage.removeItem('token')
      navigator('/Login')
    } else {
      const fetching =()=>{

      const options ={
        method : "GET",
        headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
      }
      fetch('http://localhost:3120/user/user', options)
      .then(response =>response.json())
      .then(data =>{
        if (data.server) {
          setuser(data.server)
          setProfile(data.user)
        } else {
          setuser(data.server)
          setProfile(data.user)
        }
      })
    }
    return ()=> fetching()
  }
  }, [navigator, token])
  useEffect(()=>{
    if (token === null || undefined) {
      localStorage.removeItem('token')
      navigator('/Login')
    } else {
      const fetching =()=>{

      const options ={
        method : "GET",
        headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
      }
      fetch('http://localhost:3120/user/user', options)
      .then(response =>response.blob())
      .then(data =>setImg(data.user.user_image))
    }
    return ()=> fetching()
  }
  }, [navigator, token])

  return (
    <>
    <Header />
    <div className="container">
      <div className="row mt-5 shadow">
        {user ?
        <>
        <div className="col-md-5 shadow px-5 py-5">
            <img className="img-thumbnail" src={img} alt="user"/>
        </div>
        <div className="col-md-5 px-5 py-5">
          <h3 >Personal Details <hr/></h3>
          <h3 >Name : {profile[0].user_name}</h3>
          <h3 >Email : {profile[0].user_email} </h3>
          <h3 >Mobile : {profile[0].user_mobile} </h3>
        </div>
        </>
          : 
          <div className="text-center">
            <h1>user details not found</h1>
          </div>
          }
      </div>
    </div>
    <About/>
    </>
  )
}

export default Profile
