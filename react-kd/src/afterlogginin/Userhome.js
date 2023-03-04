import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Userhome =()=>{
  return(
    <>
    <Header/>
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
        <h1 >Eat healthy, stay healthy</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Userhome;