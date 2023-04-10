import React from "react";
import { Link } from "react-router-dom";
import '../beforelogin/Exampl.css'
import Navbar from "./Navbar";
import About from "../About.jsx";


const Home =()=>{

  return(
    <>
    <Navbar/>
    <div className="container-fluid">

     <div className="container">
          <div className="row m-3">  
          <div className="col">
          <div id="carouselExampleIndicators" className="carousel slide shadow" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner shadow">
            <div className="carousel-item active">
              <img src="/slide1.jpg" className="d-block w-100 rounded shadow" alt="..."/>
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

          <div className="row justify-content-md-center ">
          <div className="col-sm-auto col-md-auto col-lg-3 bg-danger rounded m-4 shadow">
          <Link to="/" className=" text-dark">
            <h1 className="text-center">Today's Special</h1><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p className="text-dark dark-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit, illo laborum error consequuntur sed facere illum quis asperiores reiciendis, quod omnis doloremque accusantium repudiandae. Dicta minus tempora numquam!
            </p>
          </Link>
          </div>
          <div className="col-sm-auto col-md-auto col-lg-3 bg-danger rounded m-4 shadow">
          <Link to="/" className=" text-dark">
            <h1 className="text-center">Today's Special</h1><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p className="text-dark dark-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit, illo laborum error consequuntur sed facere illum quis asperiores reiciendis, quod omnis doloremque accusantium repudiandae. Dicta minus tempora numquam!
            </p>
          </Link>
          </div>
          <div className="col-sm-auto col-md-auto col-lg-3 bg-danger m-4 rounded shadow">
            <Link className=" text-dark">  
          <h1 className="text-center">Offer's Buy 1 + Get 1</h1><hr />
            <img src="/22.jpg"className="img-fluid" alt="" />
            <p className="text-dark dark-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit, illo laborum error consequuntur sed facere illum quis asperiores reiciendis, quod omnis doloremque accusantium repudiandae. Dicta minus tempora numquam!
            </p>
            </Link>
        </div>
          </div>

        <div className="row m-5">
          <div className="col-sm-4 col-md-4 col-lg-4 m-auto">
        <img className="img-fluid shadow rounded" src="/50.2.jpg"  alt=""/>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 m-auto">
      <h1 className="text-uppercase text-primary">Eat healthy stay healthy</h1><hr/>
        <p className="text-dark dark-50">Vegetarian food leaves a deep impression on our nature. If the whole world adopts 
        vegetarianism, it can change the destiny of humankind.</p>
        </div>
        </div>

      <div className="row">
      <div className="col-sm-4 col-md-4 col-lg-4 m-5">
        <h1 className="text-primary text-center text-uppercase">Get food faster then you expect</h1><hr/>
        <ul>
          <li><p className="text-dark dark-50">Avoid the lines and have groceries delivered by us.</p></li>
          <li> <p className="text-dark dark-50">Call us and we'll be there.</p></li>
          <li> <p className="text-dark dark-50">Delivered with love.</p></li>
          <li> <p className="text-dark dark-50"> Delivering happiness.</p></li>
          <li> <p className="text-dark dark-50">Delivering happiness to your home.</p></li>
          <li> <p className="text-dark dark-50">Delivering satisfaction every day.</p></li>
          <li> <p className="text-dark dark-50">Dial now for good food.</p></li>
          <li> <p className="text-dark dark-50">Don't starve, just order.</p></li>
        </ul>
      </div>
      <div className="col-sm-4 col-md-4 col-lg-6 m-auto">
          <img src="vehicle.1.jpg" className="img-fluid shadow rounded" alt=""/>
      </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 col-md-12 m-auto">
          {/* <h1 className="logo text-center">Kwality <br/> Delivery</h1> */}
        </div>
      </div>
          <p className="text-center text-dark dark-50 m-5">Copyright @ {(new Date().getFullYear())}</p>
</div>
<About/>
    </>
  )
}

export default Home;