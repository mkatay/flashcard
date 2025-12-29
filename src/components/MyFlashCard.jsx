import { useState } from 'react';
import ReactFlipCard from 'reactjs-flip-card'
import ReactMarkdown from "react-markdown";

export const MyFlashCard = ({question,answer,flipped,setFlipped}) => {
   // console.log(flipped);
    
   
  const styles = {
        cardFront: { 
            background:'var(--warm_color)',
            color: 'white',
            borderRadius: 20,
            width: 300,
            height: 410,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:'1rem',
            fontSize:'1rem',
            textAlign:'center'
        },
        cardBack: { 
            background:'var(--could_color)',
            color: 'white',
            borderRadius: 20,
            width: 300,
            height: 410,
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "center",
            alignItems: "center",
            padding:'5px',
            fontSize:'12px'
        },
    }
    
    return (
       
            <ReactFlipCard
                flipTrigger='disabled'
                flipByProp={flipped}
                onClick={()=>setFlipped(!flipped)}
                containerStyle={{ width: 300,height: 400,}}
                frontStyle={styles.cardFront}
                backStyle={styles.cardBack}
                frontComponent={<div style={{ whiteSpace: "normal" }}><ReactMarkdown>{question}</ReactMarkdown></div> }
                backComponent={<div style={{ whiteSpace: "normal" }}><ReactMarkdown>{answer}</ReactMarkdown></div> }
                direction='vertical'
            />
     
    );
}


