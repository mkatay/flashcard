import React, { useState } from "react";
import {  addTopic } from "../firestoreBackend";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { MyAuthContext } from "../context/AuthContext";
import { Button, Input, Textarea, Typography } from "@mui/joy";


export const AddTopic = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const {hasAccess,clearKey}=useContext(MyAuthContext)

const navigate=useNavigate('/')


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() ) {
      setMsg("Kérlek, töltsd ki a mezőt!");
      return;
    }
    setLoading(true);
    setMsg(null);

    try {
      await addTopic(name);
      setMsg("Témakör sikeresen hozzáadva!");
      setName("");
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
    <div style={{padding:'1rem'}}>
      <Typography level="h1"sx={{color:'white',textAlign:'center',padding:'1rem'}}>Új témakör hozzáadása</Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <div style={{ marginBottom: 12 }}>
        
            <Input value={name} onChange={(e) => setName(e.target.value)}
              placeholder="témakör neve..."
              style={{ width: "100%" }}
              disabled={loading}
              required
            />
       
        </div>
        <Button type="submit" disabled={loading}  style={{ padding: "8px 16px" }}>
          {loading ? "Mentés..." : "Hozzáadás"}
        </Button>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
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
  );
};
