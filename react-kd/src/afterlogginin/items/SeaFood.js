import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import About from '../../About.jsx'


function SeaFood() {
const navigator = useNavigate();
const token = localStorage.getItem('token')
const [readFetcheddata, setreadFetcheddata] =useState([]);

useEffect(()=>{
    
    const fetchingApidata = ()=>{
       fetch('http://localhost:3120/food/food/items/')
      .then(res => res.json())
      .then(data => {
        if (data.server === true) {
          setreadFetcheddata(data.results)
        } else {
          setreadFetcheddata(data.results)
        }
      })

    }
   return ()=> fetchingApidata()
}, [])

let filtering = readFetcheddata.filter((f)=>f.food_type === 'seafood')
const viewFetcheddata = filtering.map((food, m)=>{
  return(
      <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded" key={m}>
    <img src="/17.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>Type : {food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
    <div>
    <button className='btn-sm btn-primary mx-1' onClick={()=>navigator(`/SelectAddress/${food.food_id}`)}>Order</button>
    <button className='btn-sm btn-primary' onClick={()=>{
              let options = {
                  method : 'POST',
                  headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
              }
      
              fetch(`http://localhost:3120/cart/add/${food.food_id}`, options)
              .then(response =>response.json())
              .then(data =>{
                  if (data.server) {
                      alert('item added to cart')
                  } else {
                      navigator('/Cart')
                  }
              })
    }}><AiOutlineShoppingCart /></button>
    </div>
    </div>
      </div>
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
     <About/>
    </>
  )
}

export default SeaFood