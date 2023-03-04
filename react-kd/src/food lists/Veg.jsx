import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "../Exampl.css";
import Navbar from '../componants/Navbar';
import { useNavigate } from 'react-router-dom';

function Veg() {
  const navigator = useNavigate();
const [showFooditems, setShowFooditems] = useState([]);

useEffect(()=>{
  fetch('http://localhost:3120/food/food/items/')
  .then(response => response.json())
  .then(data =>{
    if (data.server === true) {
      setShowFooditems(data.results)
    } else {
      setShowFooditems(data.results)
    }
  })
}, [])
const mapping = showFooditems.map((food, a)=>{
  return(
    <div className="col-2 m-3 p-3 shadow rounded" key={a}>
    <img src="/19.jpg" className='img-fluid' alt="" /><br />
    <h2 className='text-center'> {food.food_name}</h2><hr />
    <p className='text-center'>{food.food_type}</p>
    <p className='text-center'>{food.food_description}</p>
    <h3>Price : {food.food_amount}</h3>
    <div className='example'>
    <button className='btn btn-primary bt display-block' onClick={()=>navigator('/Login')}>Order</button>
    <button className='btn btn-primary bt' onClick={()=>navigator('/Login')}><AiOutlineShoppingCart /></button>
    </div>
    </div>
  )
})
  return (
    <>
    <Navbar/>
    <div className='container-fluid'> 
      <div className="row m-3">
      {showFooditems ?
        mapping
      :
      <div className="container">
     <div className="text-center">
  <div className="spinner-border m-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
    </div>
      }
      </div>
    </div>
    </>
  )
}

export default Veg