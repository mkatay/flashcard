// AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const MyAuthContext = createContext();
//export const useAuth = () => useContext(AuthContext);

const STORED_HASH = "b1abf66e5cecc57b78fec302ee9f531bb029f422"; 

//const navigate=useNavigate()

const  sha1=async (str)=>{
  return crypto.subtle.digest("SHA-1", new TextEncoder().encode(str))
    .then(buf => Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join(""));
}

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);

  /*const submitKey = async (key) => {
    const hash = await sha1(key);
    setHasAccess(hash === STORED_HASH);
  };*/
const submitKey = async (key) => {
  const hash = await sha1(key);
  const ok = hash === STORED_HASH;
  if (ok) setHasAccess(true);
  return ok;  // fontos → modal ebből tudja, hogy sikerült-e
};
const clearKey = () => {
    setHasAccess(false);
    //navigate('/')
  };

  return (
    <MyAuthContext.Provider value={{ hasAccess, submitKey,clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
