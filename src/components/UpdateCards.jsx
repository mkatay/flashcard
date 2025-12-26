import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { readTopicsOnce } from '../firestoreBackend';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UpdateCardsFromSelTopic } from './UpdateCardsFromSelTopic';

export const UpdateCards = () => {
  const [topics, setTopics] = useState([]);
  const [loading,setLoading]=useState(false)
  const [selectedTopicId, setSelectedTopicId]=useState("0")
  
    useEffect(() => {
      setLoading(true)
      readTopicsOnce(setTopics,setLoading)
    }, []);
  
     const handleChange = (event) => {
      setSelectedTopicId(event.target.value);
    };
    console.log(selectedTopicId);
    
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Témakörök</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select"  value={selectedTopicId} label="Témakör"  onChange={handleChange} sx={{color:'white'}}>
            <MenuItem value="0" >válassz az alábbi témakörök közül...</MenuItem>
            {topics &&  topics.map(obj=>
               <MenuItem value={obj.id} >{obj.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      {selectedTopicId!="0" && <UpdateCardsFromSelTopic id={selectedTopicId}/>}
    </div>
  )
}


