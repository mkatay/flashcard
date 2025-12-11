// AuthContext.jsx
import { createContext, useState } from "react";
import { sha1 } from "../utils";

export const MyAuthContext = createContext();

const STORED_HASH = "b1abf66e5cecc57b78fec302ee9f531bb029f422"; 

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);

const verifyKey = async (key) => {
  const hash = await sha1(key);
  const result = hash === STORED_HASH;//true vagy false
  if (result) setHasAccess(true);
  return result;  // fontos → modal ebből tudja, hogy sikerült-e
};
const clearKey = () => {
    setHasAccess(false);
    };

  return (
    <MyAuthContext.Provider value={{ hasAccess, verifyKey,clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
