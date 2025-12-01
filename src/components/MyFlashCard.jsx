import { useState } from 'react';
import ReactFlipCard from 'reactjs-flip-card'

export const MyFlashCard = ({question,answer,flipped,setFlipped}) => {
   // console.log(flipped);
    
   
  const styles = {
        cardFront: { 
            background:'var(--warm_color)',
            color: 'white',
            borderRadius: 20,
            width: 300,
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:'1rem',
            fontSize:'1.5rem',
            textAlign:'center'
        },
        cardBack: { 
            background:'var(--could_color)',
            color: 'white',
            borderRadius: 20,
            width: 300,
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:'1rem'
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
                frontComponent={<div >{question}</div>}
                backComponent={<div >{answer}</div>}
                direction='vertical'
            />
     
    );
}


