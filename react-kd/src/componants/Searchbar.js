import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";

const Search =()=>{

    const [name, setName] = useState('');

    const objectData =
    [
        {
        id: '1',
        Name : "kalyan",
        Email: "yamakalyan6@gmail.com",
        Mobile: "9550049382"
    },
        {
            
        id: '1',  
        Name : "chinni",
        Email: "chinni@gmail.com",
        Mobile: "9898989898"
    },
        {
        id: '3',    
        Name : "kd",
        Email: "kd@gmail.com",
        Mobile: "9550051443"
    },
    {
        id: '4',
        Name : "kn",
        Email: "yamakalyan@gmail.com",
        Mobile: "9955006633"
    }
    ]

    const filtering = objectData.filter((b)=>b.Name === name);
    
    const inputSearch =(event)=>{
        setName(event.target.value)
    }
    const searchBtn =(event)=>{
        event.preventDefault();
    }                     


const view = filtering.map((maping)=>{
    return(
        
        <table class="table table-dark" border="1"> 
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td> {maping.id} </td>
                <td> {maping.Name} </td>
                <td> {maping.Email} </td>
                <td> {maping.Mobile} </td>
            </tr>
            </tbody>
        </table>
        
    )
})

   
    return(

        <>
        <Navbar inputSearch={inputSearch} searchBtn={searchBtn} />
        <div className="d-flex justify-content-center">
        <h1 className="text-center">Search Here</h1>
        </div>
        <div> {view} </div>
        </>
    )
}

export default Search;