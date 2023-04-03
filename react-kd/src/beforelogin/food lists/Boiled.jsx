import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function Boiled() {
  const [viewFood, setViewFood] =useState([])
  const navigator = useNavigate();

  useEffect(()=>{
    fetch('http://localhost:3120/food/food/items/')
    .then(response => response.json())
    .then(data => {
      if (data.server) {
        setViewFood(data.results)
      } else {
        setViewFood(data.results)
      }
    })
  }, [navigator])

  let filtering = viewFood.filter((f)=>f.food_type === 'seafood')
  let mapping = filtering.map((food, a)=>{
    return(
      <div className="col-2 m-3 p-3 shadow rounded" key={a}>
    <img src="/17.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>{food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
    <button className='btn btn-primary' onClick={()=>navigator('/Login')}>Order</button>
    <button className='btn btn-primary mr-2' onClick={()=>navigator('/Login')}><AiOutlineShoppingCart /></button>
    </div>
      </div>
    )
  })
  return (
    <>
    <Navbar/>
    <div className='container-fluid'>
      <div className="row">
    {viewFood ? mapping
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

export default Boiled