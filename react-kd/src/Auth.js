import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth =({children})=>{
    const navigator = useNavigate()
    const [user, setUser] = useState(false)
    const token = localStorage.getItem('token')
    
    useEffect(()=>{
        if (token === null || undefined) {
            localStorage.removeItem('token')
            navigator('/Login')
        } else {
            
        const fetching = async ()=>{
            let options = {
                method : 'POST',
                headers : {"content-type" : 'application/json', 'kalyan_header_key' : token}
            }
            await fetch('http://localhost:3120/user/auth', options)
            .then(response =>response.json())
            .then(data => {
                if (data.server) {
                    setUser(data.server)
                } else {
                    setUser(data.server)
                    navigator('/Login')
                    localStorage.removeItem('token')
                }
            })                               
        }
        return ()=> fetching()
    }
    }, [navigator, token])
  return (user ? children : navigator('/Login', {replace : true}) )
}

export default Auth
