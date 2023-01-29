import React from "react";
import Header from "../afterlogginin/Header";
import { useState } from 'react';


const Userhome =()=>{

  const [mode, setMode] = useState('light');

    const [border, setBorder] = useState('dark');

    const [btn, setBtn] = useState('Dark Mode');

    const changeBg =()=>{

      if(mode === 'light'){
        setMode('dark')
        setBtn("Light Mode")
        setBorder('light')


        document.body.style.backgroundColor = 'black';
    }
      else{
        setMode('light')
        setBtn("Dark Mode")
        setBorder('dark')


        document.body.style.backgroundColor = 'white';
      }


    }

  return(
    <>
    <Header mode={mode} changeBg={changeBg} btn={btn} border={border} />
    <div>
      heyy
    </div>
    </>
  )
}
export default Userhome
