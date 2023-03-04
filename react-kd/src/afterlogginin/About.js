import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <>
    <Header/>
    <div className="container mt-3 p-3 ">
      <div className="row p-2">
        <div className="col-md-6 p-3 text-center shadow">
          <img className='img-fluid' src="/selfdp.png" alt="" />
        <h3>YAMA KALYAN</h3><hr />
        <small>Designed by myself</small>
        </div>
        <div className="col-md-6 p-3">
        <p>This is an shopping app.</p>
        <h5> Tech used in this project. </h5><hr />
          <b>HTML</b><br />
          <b>CSS</b><br />
          <b>REACT.JS</b><br />
          <b>NODE.JS</b><br />
          <b>EXPRESS.JS</b><br />
          <b>MySQL</b><br /><br />
        <p> Dynamically devoloped with rest Api in Node.js with MySQl database. </p>
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

export default About;