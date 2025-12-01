import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { readCardsOnce } from '../firestoreBackend';
import { MyFlashCard } from '../components/MyFlashCard';
import { useEffect } from 'react';
import { GrCaretNext } from "react-icons/gr";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Button } from '@mui/joy';

export const Topic = () => {
const [cards, setCards] = useState([]);
const [index, setIndex] = useState(0);
const [flipped, setFlipped] = useState(false);

const {id,name}=useParams()
const navigate=useNavigate()

  useEffect(() => {
   readCardsOnce(id,setCards)
  }, []);

  const prevCard = () =>{
    setFlipped(false)
    setIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1))

  }
  const nextCard = () =>{
    setFlipped(false)
    setIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0))
 
  }
  const currentCard = cards[index]; //csak ezt az egyet mutatjuk


  return (
    <div>
      <h1 style={{textAlign:'center',color:'white'}}>{name}</h1>
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem"
          }}
        >
        {currentCard && <MyFlashCard {...currentCard} flipped={flipped} setFlipped={setFlipped}/>}
        <div style={{display: "flex", gap: "1rem"}}>
            <Button onClick={prevCard} color="neutral"><IoCaretBack/></Button>
            <Button onClick={nextCard} color="neutral"><IoCaretForwardSharp/></Button>
        </div>
        {cards.length > 0 && (
            <div style={{color: "#d7cec7"}}>
              {index + 1} / {cards.length}
            </div>
          )}
      </div>

      <div style={{textAlign:"center", marginTop:"2rem"}}>
        <Button  color="neutral" onClick={() => navigate("/addcard/" + id)}>
          Új kártya hozzáadása
        </Button>
      </div>
    </div>
  )
}


