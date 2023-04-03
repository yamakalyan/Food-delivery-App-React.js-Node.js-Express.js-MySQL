import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CartRemove() {
    const params =useParams()
    const navigator = useNavigate()
    const token = localStorage.getItem('token')
    const [remove, setRemove] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        const fetching =()=>{
            let options = {
                method : 'DELETE',
                headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
            }
            fetch(`http://localhost:3120/cart/remove/${params.id}`, options)
            .then(resposne => resposne.json())
            .then(data =>{
                if (data.server) {
                    setRemove(data.server)
                    // navigator('/Cart')
                    navigator(`/payments/${params.id}`)
                } else {
                    setRemove(data.server)
                    setMsg(data.message)
                    navigator(`/payments/${params.id}`)
                }
            })
        }
        return ()=> fetching()
    }, [])

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  )
}

export default CartRemove
