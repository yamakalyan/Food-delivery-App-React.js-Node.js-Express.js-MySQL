import React, { useEffect, useState } from 'react'
import Header from '../afterlogginin/Header';
import { AiOutlineShoppingCart } from 'react-icons/ai';


function Chinese() {

const [listview, setlistview] = useState(false);
const [readFetcheddata, setreadFetcheddata] =useState([]);

useEffect(()=>{
  const fetchingApidata = async()=>{
    await fetch('http://localhost:3120/food/items/')
    .then(res => res.json())
    .then(data => setreadFetcheddata(data.results))
  }
  fetchingApidata()
  setlistview(true)
}, [])

const viewFetcheddata = readFetcheddata.map((food, m)=>{
  return(
    <>
     <div> 
      <div className="col-3 m-3 p-3 shadow rounded" key={m}>
    <img src="/13.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>{food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}</h5>
    <button className='btn btn-primary mr-2'><AiOutlineShoppingCart /></button>
    </div>
      </div>
  </div>
    </>
  )
})
  return (
    <> 
    <Header/>
    {listview ?  
      viewFetcheddata
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

export default Chinese