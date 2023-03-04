import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home =()=>{
  
    
  return(
    <>
    <Navbar about={'#AboutUs'} />
      <div className="container-fluid m-1 bg-dark">
        <div className="row">
          <div className="col-6 m-auto text-dark">
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
      <div className="container-fluid m-1 bg-light text-dark">
        <div className="row">
          <div className="col-6 text-center">
        <img className="img-fluid" src="/50.png"  alt=""/>
          </div>
          <div className="col-6">
        <img className="img-fluid mt-3" src="/newbg.png"  alt=""/>
          </div>
        </div>
      </div>
      <div className="container shadow mt-5">
        <h2 className="text-center">Write to Us</h2><hr/>

      <div id="AboutUs" className="text-center p-5 m-5"> 

      <div class="input-group mb-3">
      <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">Name</span>
      </div>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div class="input-group mb-3">
      <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">@gmail</span>
      </div>
      <input type="text" class="form-control" placeholder="Useremail" aria-label="Useremail" aria-describedby="basic-addon1"/>
      </div>

      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text">With textarea</span>
      </div>
      <textarea class="form-control" aria-label="With textarea"></textarea>
      </div>

      </div>
      </div>
    </>
  )
}

export default Home;