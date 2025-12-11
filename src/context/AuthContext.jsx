// AuthContext.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const MyAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);

  const verifyKey = async (key) => {
    try {
      const res = await axios.post("http://localhost:3001/login", { key });
      const token = res.data.token;
      if (!token) return false;

      localStorage.setItem("token", token);
      setHasAccess(true);
      return true;
    } catch (err) {
      return false;
    }
  };

  const clearKey = () => {
    localStorage.removeItem("token");
    setHasAccess(false);
  };

  return (
    <MyAuthContext.Provider value={{ hasAccess, verifyKey, clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
