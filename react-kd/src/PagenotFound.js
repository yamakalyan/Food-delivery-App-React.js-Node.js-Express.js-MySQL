import React from 'react'
import './custum.css'

function PagenotFound() {
  return (
    <>
    <div className='navError'>
    <nav >
        <ul>
            <li className='error'>Error !</li>
        </ul>
    </nav>
    </div>
    <div className='container'>
      <img src='404.jpg' className='img-fluid' alt=''/>
    </div>
    </>
  )
}

export default PagenotFound
