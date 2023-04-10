import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import About from '../../About';


function Chinese() {
const navigator = useNavigate();
const [readFetcheddata, setreadFetcheddata] =useState([]);

useEffect(()=>{
  const fetchingApidata = async()=>{
    await fetch('http://localhost:3120/food/food/items/')
    .then(res => res.json())
    .then(data => {
      if (data.server === true) {
        setreadFetcheddata(data.results)
      } else {
        setreadFetcheddata(data.results)
      }
    })
  }
  fetchingApidata()
}, [])

let filtering = readFetcheddata.filter((f)=>f.food_type === 'non-veg')
const viewFetcheddata = filtering.map((food, m)=>{
  return(
    <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded" key={m}>
    <img src="/13.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>{food.food_type}</small><hr />
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
    {readFetcheddata ?  
    <div className='row m-3'>
      {viewFetcheddata}
    </div>
    :
    <div className="container">
     <div className="text-center">
    <div className="spinner-border m-auto" role="status">
    <span className="sr-only">Loading...</span>
    </div>
    </div>
    </div>
     } 
     <About/>
    </>
  )
}

export default Chinese