import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { readCardsOnce } from '../firestoreBackend';
import { MyFlashCard } from '../components/MyFlashCard';
import { useEffect } from 'react';
import { IoHome } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Button } from '@mui/joy';
import { useContext } from 'react';
import { MyAuthContext } from '../context/AuthContext';
import { AccessKeyModal } from '../components/AccesKeyModal';

export const Topic = () => {
const { hasAccess } = useContext(MyAuthContext)
const [cards, setCards] = useState([]);
const [index, setIndex] = useState(0);
const [flipped, setFlipped] = useState(false);
//const [modalOpen, setModalOpen] = useState(false);


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

  /*const handleAddCardClick = () => {
    if (hasAccess) {
      navigate("/addcard/" + id);
    } else {
      setModalOpen(true); // kulcsot még nem adott meg → modal nyitás
    }
  };

*/

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
{/*
     <div style={{textAlign:"center", marginTop:"2rem"}}>
        <Button  color="neutral" onClick={handleAddCardClick}>
          Új kártya hozzáadása
        </Button>
      </div>

         <AccessKeyModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => navigate("/addcard/" + id+"/"+name)}
        />
*/}
        <IoHome size={30} style={{position:'fixed',top:0,left:0,color:'white'}} onClick={()=>navigate('/')}/>
    </div>
  )
}


