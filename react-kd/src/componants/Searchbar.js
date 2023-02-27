import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";

const Search =()=>{
    const [input, setinputSearch] = useState('')
    const [searchMap, setSearchmap] = useState(false);
    const [result, setresult] = useState('')

    const searchChange = (e)=>{
        setinputSearch(e.target.value)
    }

    const searchBtn = (event)=>{
        event.preventDefault();
        
        let searchBAr = {
            food_name : input
        }

        const options = {
            body : JSON.stringify(searchBAr)
        }
        
        fetch('http://localhost:3120/food/search/', options)
        .then(res => res.json())
        .then(data => {setSearchmap(data.server);setresult(data.results)})
    }
        console.log(result)

    return(

        <>
        <Navbar searchBtn={searchBtn} searchChange={searchChange} />
        <div>
            {searchMap?
            <div>
                search 
            </div>
            :
            <div>loading........</div>
            }
        </div>
        </>
    )
}

export default Search;