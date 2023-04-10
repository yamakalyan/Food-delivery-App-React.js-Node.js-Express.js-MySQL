import React from "react";
import { Link } from "react-router-dom";
import '../afterlogginin/login.css'
import Header from '../afterlogginin/Header'
import About from "../About";

const Userhome =()=>{

  return(
    <>
    <Header />
    <div className="container">

     <div className="container">
          <div className="row">  
          <div className="col m-5">
          <div id="carouselExampleIndicators" className="carousel slide shadow" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner shadow">
            <div className="carousel-item active">
            <Link to='/SeaFood' >
              <img src="/slide1.jpg" className="d-block w-100 rounded shadow" alt="..."/>
            </Link>
              <div className="carousel-caption d-none d-md-block">
                <h2>CHICKEN KABAB'S</h2>
                <p>Chicken kebabs are textured and flavored with aromatic spices and grilled to perfection. The chicken kebabs can be grilled, barbequed or baked in an oven, which adds to the versatility
                  of this dish. This flavorful dish makes a great appetizer and a delightful snack which is both delicious and healthy.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/slide2.jpg" className="d-block w-100 rounded shadow" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h2>PANEER TIKKA'S</h2>
                <p>Paneer tikka is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor. It is a vegetarian alternative to chicken tikka and other meat dishes. 
                  It is a popular dish that is widely available in India and countries with an Indian diaspora..</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/slide3.jpg" className="d-block w-100 rounded shadow" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h2>DAL MASALA</h2>
                <p>This Dal Makhani recipe is a restaurant style version with subtle smoky flavors and creaminess of the lentils. 
                  If you love authentic Punjabi food then you are going to love this Dal Makhani even more..</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </button>
        </div>
          </div>
          </div>
          </div> 

          <div className="row">
          <div className="shadow col-sm-auto col-md-auto col-lg-3 m-2">
          <Link to="/" className="nav-link">
            <h2>Today's Special</h2><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p className="text-center text-dark dark-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
          </Link>
          </div>
          <div className="shadow col-sm-auto col-md-auto col-lg-3 m-2">
          <Link to="/" className="nav-link">
            <h2>Today's Special</h2><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p className="text-center text-dark dark-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
          </Link>
          </div>
          <div className="shadow col-sm-auto col-md-auto col-lg-3 m-2">
          <Link to="/" className="nav-link">
            <h2>Today's Special</h2><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p className="text-center text-dark dark-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
          </Link>
          </div>
          </div>

        <div className="row m-3">
          <div className="col-sm-6 col-md-6 col-lg-5 m-2">
        <img className="img-fluid shadow rounded" src="/50.2.jpg"  alt=""/>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-5 m-2">
      <h1 className="text-primary">Eat healthy stay healthy</h1><hr/>
        <p className=" text-dark dark-50">Vegetarian food leaves a deep impression on our nature. If the whole world adopts 
        vegetarianism, it can change the destiny of humankind.</p>
        </div>
        </div>

      <div className="row m-3">
      <div className="col-sm-4 col-md-4 col-lg-5 m-2">
        <h1 className="text-primary">Get food faster then you expect</h1><hr/>

         <p className="text-dark dark-50">Avoid the lines and have groceries delivered by us.</p>
          <p className="text-dark dark-50">Call us and we'll be there.</p>
          <p className="text-dark dark-50">Delivered with love.</p>
          <p className="text-dark dark-50"> Delivering happiness.</p>
          <p className="text-dark dark-50">Delivering happiness to your home.</p>
          <p className="text-dark dark-50">Delivering satisfaction every day.</p>
          <p className="text-dark dark-50">Dial now for good food.</p>
          <p className="text-dark dark-50">Don't starve, just order.</p>
      </div>
      <div className="col-sm-4 col-md-4 col-lg-5 m-2">
          <img src="vehicle.1.jpg" className="img-fluid shadow rounded" alt=""/>
          </div>
        </div>
</div>
<About/>
    </>
  )
}

export default Userhome;