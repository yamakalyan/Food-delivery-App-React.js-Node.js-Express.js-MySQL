import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';


function SeaFood() {
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


const viewFetcheddata = readFetcheddata.map((food, m)=>{
  return(
    <>
      <div className="col-2 m-3 p-3 shadow rounded" key={m}>
    <img src="/17.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>{food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}</h5>
    <button className='btn btn-primary' onClick={()=>navigator('/Login')}>Order</button>
    <button className='btn btn-primary mr-2' onClick={()=>navigator('/Login')}><AiOutlineShoppingCart /></button>
    </div>
      </div>
    </>
  )
})
  return (
    <> 
    <Header/>
    {readFetcheddata ?  
    <div className='row'>

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
    </>
  )
}

export default SeaFood