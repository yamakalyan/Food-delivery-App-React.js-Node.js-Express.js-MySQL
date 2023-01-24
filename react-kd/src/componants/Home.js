import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home =()=>{
  
    
  return(
    <>
    <Navbar />
    <div className="container-fluid text-light">
      <div className="position-absolute">
      <img className="img-fuild" src="/bgfood.png" height='100%' width='100%' alt=""/>
      </div>
      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-6 m-auto">
        <img className="img-responsive" src="/kdlogo.png" height='100%' width='700px' alt="" />
          </div>
          <div className="col-2 m-5 bg-light shadow">
          <Link to="/" className=" text-dark">
            <h4>Today's Special</h4><hr />
            <img src="/19.jpg" className="img-thumbnail shadow" alt="" />
            <p>ectus quaerat reprehenderit, illo laborum error consequuntur sed
               facere illum quis asperiores reiciendis, quod omnis doloremque 
               accusantium repudiandae. Dicta minus tempora numquam!
            </p>
          </Link>
          </div>
          <div className="col-2 m-5 text-dark bg-light shadow">
            <Link className=" text-dark">  
          <h4>Offer's Buy One + Get One</h4><hr />
            <img src="/22.jpg"className="img-thumbnail shadow" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit, illo laborum error consequuntur sed facere illum quis asperiores reiciendis, quod omnis doloremque accusantium repudiandae. Dicta minus tempora numquam!
            </p>
            </Link>
        </div>
          </div>
          </div>
      </div>
      <div className="container">  
      <div className="row">
        <div className="col-3 m-3" >
          <img src="/14.jpg" className="img-thumbnail p-3" alt="" />
        </div>
        <div className="col-3 m-3" >
          <img src="/14.jpg" className="img-thumbnail p-3" alt="" />
        </div>
        <div className="col-3 m-3" >
          <img src="/14.jpg" className="img-thumbnail p-3" alt="" />
        </div>
          <div className="col mt-3 text-light">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro repellat architecto modi, dignissimos perspiciatis, culpa, recusandae magnam asperiores rerum voluptates odio molestias eum labore. Fugiat adipisci accusamus quisquam quibusdam neque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum deleniti veritatis provident quis sint impedit nam facilis quos exercitationem asperiores voluptatibus cumque ipsum est totam, aliquid praesentium error sit non.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis tempora praesentium ipsam sed impedit, ullam necessitatibus? Vitae aliquam laudantium numquam corporis suscipit, voluptates soluta voluptatibus recusandae vero ipsam voluptatum voluptate.
            lorem
          </p>
          </div>
          <div className="col-6">
            <img src="/15.jpg" alt="" />
          </div>
          <div className="col-6">
            <img src="/16.jpg" alt="" />
          </div>
      </div>
      </div>
    </>
  )
}

export default Home;