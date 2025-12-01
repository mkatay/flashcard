import React, { useState } from "react";
import { addCard } from "../firestoreBackend";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { MyAuthContext } from "../context/AuthContext";
import { Button, Textarea, Typography } from "@mui/joy";

export const AddCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const {hasAccess,clearKey}=useContext(MyAuthContext)

const navigate=useNavigate('/')
  const { id ,name} = useParams();


console.log(hasAccess,id,name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setMsg("Kérlek, töltsd ki mindkét mezőt!");
      return;
    }
    setLoading(true);
    setMsg(null);

    try {
      await addCard(id, { question, answer });
      setMsg("Kártya sikeresen hozzáadva!");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      setMsg("Hiba történt a hozzáadás során.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout=()=>{
    clearKey()
    navigate('/')
  }

  return (
    <div>
      <Typography level="h1"sx={{color:'white',textAlign:'center',padding:'1rem'}}>{name}</Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <div style={{ marginBottom: 12 }}>
        
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              minRows={4}
              placeholder="kérdés..."
              style={{ width: "100%" }}
              disabled={loading}
              required
            />
       
        </div>
        <div style={{ marginBottom: 12 }}>
        
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              minRows={4}
              placeholder="válasz..."
              style={{ width: "100%" }}
              disabled={loading}
              required
            />
 
        </div>
        <Button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 16px" }}
        >
          {loading ? "Mentés..." : "Hozzáadás"}
        </Button>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
      {hasAccess && (
        <Button
          color="danger"
          onClick={handleLogout}
          size="sm"
          style={{ marginBottom: "1rem" }}
        >
          Kilépés admin módból
        </Button>
      )}
    </div>
  );
};
