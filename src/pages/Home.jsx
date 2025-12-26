import React, { useEffect, useState } from "react";
import {  readTopicsOnce } from "../firestoreBackend";
import { useNavigate } from "react-router";
import { Box, Card, CardContent, Typography } from "@mui/joy";
import { HashLoader } from "react-spinners";

export const Home = () => {
  const [topics, setTopics] = useState([]);
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  useEffect(() => {
    setLoading(true)
    readTopicsOnce(setTopics,setLoading)
  }, []);

//console.log(loading);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20,display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
      <h1 style={{color:'#d7cec7',textAlign:'center',padding:'1rem'}}>OSZTV verseny témakörök</h1>
      <h4 style={{color:'#d7cec7'}}>Szoftverfejlesztő és tesztelő szakma</h4>
       <Box 
          sx={{
          width: '100%',
          maxWidth: 500,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          justifyItems: 'center',   // <-- minden elem középre kerül!
          gap: 2,
        }}
       >
      <HashLoader 
        color='white'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
       
      />
          {topics && topics.map((topic) => 
          <Card variant="solid" key={topic.id}  onClick={() => navigate('/topic/'+topic.id+'/'+topic.name)}>
            <CardContent>
              <Typography level="title-md" textColor="inherit">
                 {topic.name}
              </Typography>
              <Typography textColor="inherit">Description of the card.</Typography>
            </CardContent>
          </Card>
          )}
        </Box>    
    </div>
  );
};
