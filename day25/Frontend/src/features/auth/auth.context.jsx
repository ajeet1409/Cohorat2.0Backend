import {  createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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


