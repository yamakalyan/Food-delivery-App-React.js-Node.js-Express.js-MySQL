import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="container mt-3 p-3">
      <div className="row p-2">
        <div className="col-md-6 p-3 text-center shadow">
        <h1>YAMA KALYAN <br /><b>Shopping app.</b></h1>
        </div>
        <div className="col-md-6 p-3">
        <p>This is an shopping app. </p>
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
    </>
  )
}

export default Home