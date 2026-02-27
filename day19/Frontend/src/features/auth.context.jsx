import { createContext,  useState } from "react";
import { login, register } from "../features/auth/services/auth.api.js";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setlLoading] = useState(false);

  
const handleLogin = async (user) => {
console.log(user);
    setlLoading(true);
    try {
      const res = await login(user);
      console.log(res);
      setUser(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setlLoading(false);
    }
  };

  const handleRegister= async (user)=>{
    setlLoading(true)
    try {
        
        const res=await register(user)
        setUser(res)
        return res
    } catch (error) {
        console.log(error);
        
    }finally{
        setlLoading(false)
    }

  }

  return (
    <div>
      <authContext.Provider value={{ user, loading, handleLogin,handleRegister }}>
        {children}
      </authContext.Provider>
    </div>
  );
};

