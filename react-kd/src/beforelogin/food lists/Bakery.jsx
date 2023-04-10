import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import About from '../../About';

function Bakery() {
  const navigator = useNavigate();
  const [showFood, setShowfood] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3120/food/food/items/')
    .then(response => response.json())
    .then(data => {
      if (data.server) {
        setShowfood(data.results)
      } else {
        setShowfood(data.results)
      }
    })
  },[])

  let filtering = showFood.filter((f)=> f.food_type === 'bakery')
  const mapping = filtering.map((food, key)=>{
  return(
    <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded" key={key}>
      <img src="/12.jpg" className='img-fluid' alt="" /><br />
      <h2 className='text-center'>{food.food_name}</h2><hr />
      <p className='text-center'>{food.food_type}</p>
      <p className='text-center'>{food.food_description}</p>
      <div className='example'>
      <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
      <div>
      <button className='btn-sm btn-primary mx-1' onClick={()=>navigator('/Login')} >Order</button>
      <button className='btn-sm btn-primary' onClick={()=>navigator('/Login')} ><AiOutlineShoppingCart /></button>
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
        {showFood ? mapping
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

export default Bakery