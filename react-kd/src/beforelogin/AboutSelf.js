import React from 'react';
import Navbar from './Navbar';
import About from "../About.jsx";

const AboutSelf = () => {
  return (
    <>
    <Navbar/>
    <div className="container mt-3 p-3 ">
      <div className="row p-2">
        <div className="col-md-6 p-3 text-center shadow">
          <img className='img-fluid' src="/selfdp.png" alt="" />
        <h3>YAMA KALYAN</h3><hr />
        <small>Designed by myself</small>
        </div>
        <div className="col-md-6 p-3">
        <p>This is an food delivery app.</p>
        <h5> Techs used in this project. </h5><hr />
          <b>HTML</b><br />
          <b>CSS</b><br />
          <b>BOOTSTRAP</b><br />
          <b>REACT.JS</b><br />
          <b>NODE.JS</b><br />
          <b>EXPRESS.JS</b><br />
          <b>MySQL</b><br /><br />
        <p> Dynamically devoloped with rest Api in Node.js with MySQl database. </p>
        </div>
      </div>
    </div>
    <div className="container shadow mt-5">
        <h2 className="text-center">Write to Me</h2><hr/>

      <div id="AboutUs" className="text-center p-5 m-5"> 

      <div className="input-group mb-3">
      <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">Name</span>
      </div>
      <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
      <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">@gmail</span>
      </div>
      <input type="text" className="form-control" placeholder="Useremail" aria-label="Useremail" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group">
      <div className="input-group-prepend">
      <span className="input-group-text">write here</span>
      </div>
      <textarea className="form-control" aria-label="With textarea"></textarea>
      </div><br/>

      <div>
        <button className='btn btn-primary btn-lg btn-block'>Submit</button>
      </div>

      </div>
      </div>
      <About/>
    </>
  )
}

export default AboutSelf;