import React from "react";
import { Link } from "react-router-dom";
import '../beforelogin/Exampl.css';
import Header from '../afterlogginin/Header'

const Userhome =()=>{

  return(
    <>
    <Header />
    <div className="container-fluid position-relative">
    {/* <svg class="w-full h-full position-absolute" viewBox="0 0 8000 8000">
      <defs>
        <pattern id="bg_pattern" width="100" height="100" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="10" y2="10" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line>
        <line x1="90" y1="90" x2="100" y2="100" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line> 
        <line x1="10" y1="90" x2="0" y2="100" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line> 
        <line x1="90" y1="10" x2="100" y2="0" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line> 
        <line x1="40" y1="40" x2="60" y2="60" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line> 
        <line x1="60" y1="40" x2="40" y2="60" stroke="#3b3d93" stroke-width="6" stroke-linecap="round" opacity="1"></line>
        </pattern>
        </defs><rect x="0" y="0" width="100%" height="100%" fill="#1d1d1e" opacity="1"></rect>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)" opacity="1"></rect>
        </svg> */}
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

          <div className="container-fluid m-5">  
          <div className="row ">
          <div className="col-3 rounded m-5 shadow">
          <Link to="/" className="nav-link">
            <h2 className="p-2">Today's Special</h2><hr />
            <img src="/19.jpg" className="img-fluid" alt="" />
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
          </Link>
          </div>
          <div className="col-3 m-5 rounded shadow">
            <Link className="nav-link">  
          <h2 className="p-2">Offer! 0rder 1 + 1</h2><hr />
            <img src="/22.jpg"className="img-fluid" alt="" />
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
            </Link>
        </div>
          <div className="col-3 m-5 rounded shadow">
            <Link className="nav-link">  
          <h2 className="p-2">Offer! 0rder 1 + 1</h2><hr />
            <img src="/22.jpg"className="img-fluid" alt="" />
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat reprehenderit
            </p>
            </Link>
        </div>
          </div>
      </div>

      <div className="container-fluid m-5">
        <div className="row m-5">
          <div className="col-6">
        <img className="img-fluid shadow rounded" src="/50.2.jpg"  alt=""/>
          </div>
          <div className="col-4">
      <h1 className="veg-align text-primary">Eat healthy stay healthy</h1><hr/>
        <p className="para-quote">Vegetarian food leaves a deep impression on our nature. If the whole world adopts 
        vegetarianism, it can change the destiny of humankind.</p>
        </div>
        </div>
      </div>

      <div className="container-fluid row m-5 rounded">
      <div className="col-4 ">
        <h1 className="text-align text-primary">Get food faster then you expect</h1><hr/>
        <ul>
          <li><p className="para-align ">Avoid the lines and have groceries delivered by us.</p></li>
          <li> <p className="para-align ">Call us and we'll be there.</p></li>
          <li> <p className="para-align ">Delivered with love.</p></li>
          <li> <p className="para-align "> Delivering happiness.</p></li>
          <li> <p className="para-align ">Delivering happiness to your home.</p></li>
          <li> <p className="para-align ">Delivering satisfaction every day.</p></li>
          <li> <p className="para-align ">Dial now for good food.</p></li>
          <li> <p className="para-align ">Don't starve, just order.</p></li>
        </ul>
      </div>
      <div className="col-6 ">
          <img src="vehicle.1.jpg" className="img-fluid shadow rounded" alt=""/>
          </div>
        </div>

        <div className="container text-center">
          <h1 className="logo">Kwality <br/> Delivery</h1>
        </div>
        <div className="container text-center mt-5">
          <p>Copyright @ {(new Date().getFullYear())}</p>
        </div>
</div>
    </>
  )
}

export default Userhome;