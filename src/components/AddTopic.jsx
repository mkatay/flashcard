import React, { useState } from "react";
import {  addTopic } from "../firestoreBackend";

import { Button, Input, Textarea, Typography } from "@mui/joy";


export const AddTopic = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);


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
     

    </div>
  );
};
