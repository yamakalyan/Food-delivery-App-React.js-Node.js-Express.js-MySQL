import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "../Exampl.css";
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import About from '../../About'

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

let filtering = showFooditems.filter((f)=>f.food_type === 'veg')
console.log(filtering)
const mapping = filtering.map((food, a)=>{
  return(
    <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded" key={a}>
    <img src="/19.jpg" className='img-fluid' alt="" /><br />
    <h2 className='text-center'> {food.food_name}</h2><hr />
    <p className='text-center'>{food.food_type}</p>
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
    <div>
    <button className='btn-sm btn-primary mx-1' onClick={()=>navigator('/Login')}>Order</button>
    <button className='btn-sm btn-primary' onClick={()=>navigator('/Login')}><AiOutlineShoppingCart /></button>
    </div>
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
    <About/>
    </>
  )
}

export default Veg