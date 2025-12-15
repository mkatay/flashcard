import { Button } from '@mui/joy'
import React from 'react'
import { useState } from 'react'

import { UpdateTopic } from '../components/UpdateTopic'
import { UpdateCards } from '../components/UpdateCards'
import { IoHome } from 'react-icons/io5'
import { useNavigate } from 'react-router'



export const Dashboard = () => {
    const [op,setOp]=useState("")
    const navigate=useNavigate()

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexWrap:'wrap',gap:'1rem',marginTop:'2rem'}}>
        <h3 style={{color:'white'}}>Dashboard</h3>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'1rem',marginTop:'2rem'}}>
        <Button disabled={op=="updatetopic"} onClick={()=>setOp("updatetopic")}>Témakör aktualizálása</Button>
        <Button disabled={op=="updatecard"} onClick={()=>setOp("updatecards")}>Kártyák aktualizálása</Button>
    </div>
      {op=="updatecards" && <UpdateCards/>}
      {op=="updatetopic" && <UpdateTopic/>}
      <IoHome size={30} style={{position:'fixed',top:0,left:0,color:'white'}} onClick={()=>navigate('/')}/>
    </div>
  )
}

