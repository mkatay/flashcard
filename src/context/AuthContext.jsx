import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;
export const MyAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
console.log(hasAccess);

  // app induláskor: "be vagyok lépve?"
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/protected`, {
          withCredentials: true, // ⬅️ cookie elküldése :Megmondja a böngészőnek, hogy küldje el a cookie-kat a kéréshez, és fogadja is el őket a válaszból.
        });
        //Alapértelmezésben a böngésző NEM küld cookie-t cross-origin (más domain / port) kéréseknél.
        setHasAccess(true);
      } catch {
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const verifyKey = async (key) => {
    try {
      await axios.post(`${API_URL}/login`,{ key }, { withCredentials: true });
      setHasAccess(true);
      return true;
    } catch {
      return false;
    }
  };

  const clearKey = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setHasAccess(false);
  };

  if (loading) return null; // vagy spinner

  return (
    <MyAuthContext.Provider value={{ hasAccess, verifyKey, clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
