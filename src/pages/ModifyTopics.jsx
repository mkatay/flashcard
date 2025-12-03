import { Button } from '@mui/joy'
import React from 'react'
import { useState } from 'react'
import { useContext } from "react";
import { MyAuthContext } from "../context/AuthContext";
import { UpdateTopic } from '../components/UpdateTopic'
import { AddTopic } from '../components/AddTopic'
import { useNavigate } from 'react-router';


export const ModifyTopics = () => {
    const [op,setOp]=useState("")
    const {hasAccess,clearKey}=useContext(MyAuthContext)
    
    const navigate=useNavigate('/')

    const handleLogout=()=>{
        clearKey()
        navigate('/')
    }
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexWrap:'wrap',gap:'1rem',marginTop:'2rem'}}>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'1rem',marginTop:'2rem'}}>
        <Button disabled={op=="addtopic"} onClick={()=>setOp("addtopic")}>Új témakör hozzáadása</Button>
        <Button disabled={op=="updatetopic"} onClick={()=>setOp("updatetopic")}>Témakör módosítása / törlése</Button>
    </div>
      {op=="addtopic" && <AddTopic/>}
      {op=="updatetopic" && <UpdateTopic/>}
       {hasAccess && (
        <Button
          color="danger"
          onClick={handleLogout}
          size="sm"
          style={{ marginBottom: "1rem",position:'fixed',bottom:0,right:0 }}
        >
          Kilépés admin módból
        </Button>
      )}
    
    </div>
  )
}

