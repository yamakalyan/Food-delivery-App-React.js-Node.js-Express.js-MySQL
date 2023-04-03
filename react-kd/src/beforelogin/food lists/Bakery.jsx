import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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
    <div className="col-2 m-3 p-3 shadow rounded" key={key}>
      <img src="/12.jpg" className='img-fluid' alt="" /><br />
      <h2 className='text-center'>{food.food_name}</h2><hr />
      <p className='text-center'>{food.food_type}</p>
      <p className='text-center'>{food.food_description}</p>
      <h3 className='text-center'>Price : ₹{food.food_amount}/-</h3>
      <div className='example'>
      <button className='btn btn-primary bt' onClick={()=>navigator('/Login')} >Order</button>
      <button className='btn btn-primary bt' onClick={()=>navigator('/Login')} ><AiOutlineShoppingCart /></button>
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
    </>
  )
}

export default Bakery