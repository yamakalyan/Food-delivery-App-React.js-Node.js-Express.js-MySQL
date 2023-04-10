import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'
import About from '../../About.jsx'
import { AiOutlineShoppingCart } from 'react-icons/ai'

function Solo() {
    const [item, setItem] = useState([])
    const token = localStorage.getItem('token')
    const params = useParams()
    const navigator = useNavigate()

    useEffect(()=>{
        const findSearchedFood = async ()=> {
            await fetch(`http://localhost:3120/food/search/?text=${params.name}`)
            .then(response =>response.json())
            .then(data =>{
              if (data.server) {
                setItem(data.results)
              } else {
                alert("Item not found")
              }
            })
          }
        return ()=> findSearchedFood()
    }, [params])

    const mapping = item?.map((food, a)=>{
        return(
    <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded " key={a}>
    <img src="/veg.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>Type : {food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='d-flex justify-content-between '>
    <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
    <div>
    <button className='btn-sm btn-primary mx-2' onClick={()=>navigator(`/SelectAddress/${food.food_id}`)}>Order</button>
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
    <div className='container'>
        <div className='row'>
            {mapping}
        </div>
    </div>
      <About/>
    </>
  )
}

export default Solo
