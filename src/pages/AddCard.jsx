import React, { useState } from "react";
import { addCard } from "../firestoreBackend";
import { useParams } from "react-router";

export const AddCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const {id}=useParams()

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

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ marginBottom: 12 }}>
        <label>
          Kérdés:
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
            disabled={loading}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>
          Válasz:
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
            disabled={loading}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Mentés..." : "Hozzáadás"}
      </button>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </form>
  );
};
