import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'

function Solo() {
    const [item, setItem] = useState([])
    const params = useParams()
    const navigator = useNavigate()

    useEffect(()=>{
        const fetching = async ()=>{
            await fetch(`http://localhost:3120/food/`)
            .then(response =>response.json())
            .then(data =>{
                if (data.server) {
                    setItem(data.results)
                } else {
                    setItem(data.results)
                }
            })
        }
        return ()=> fetching()
    }, [])
    const mapping =item.map((item, i)=>{
        return(
            <div className='col'>
                <h1> {} </h1>
                <h4>  </h4>
                <p>  </p>
                <h2>  </h2>
            </div>
        )
    })
  return (
    
    <>
    <Header/>
    <div className='container'>
        <div className='row'>

        </div>
    </div>
      
    </>
  )
}

export default Solo
