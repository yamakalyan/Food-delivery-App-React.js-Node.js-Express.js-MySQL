import React from 'react'

const About = () => {
  return (
    <>
    <div className='container mt-5'>
    <div className="text-center">
          <h1 className="logo">Kwality <br/> Delivery</h1>
        </div>
        <div className='row mt-5'>
            <div className='col-3 m-2 col-md'>
                <ul>
                    <li><b>About</b></li>
                    <li>Contact</li>
                    <li>Address</li>
                    <li>Location</li>
                    <li>Mobile</li>
                </ul>
            </div>
            <div className='col-3 m-2 col-md'>
                <ul>
                    <li><b>FAQ</b></li>
                    <li>How to order ?</li>
                    <li>Refund policy ?</li>
                    <li>How to add address ?</li>
                </ul>
            </div>
            <div className='col-3 m-2 col-md'>
                <ul>
                    <li><b>Links</b></li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Whatsapp</li>
                    <li>Twitter</li>
                </ul>
            </div>
        </div>
          <p className="text-center mt-3 mb-3"><b>Yama kalyan</b> Reserved All Copyrights @ {(new Date().getFullYear())}</p>
        <div className='d-flex justify-content-between align-items-center mt-3 mb-3'>
            <span>terms and conditions</span>
            <span>Security</span>
            <span>Refund policy</span>
            <span>licence</span>
        </div>
    </div>
      
    </>
  )
}

export default About
