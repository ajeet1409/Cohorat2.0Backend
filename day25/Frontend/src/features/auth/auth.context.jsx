import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api..js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const value={
    user,setLoading,setUser,loading
  }

  return (

    <>

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

    </>
  );
};


