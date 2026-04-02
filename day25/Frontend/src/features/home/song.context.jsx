import { createContext, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  const values = {
    songs,
    setSongs,
    song,
    setSong,
    loading,
    setLoading,
  };

  return <songContext.Provider value={values}>{children}</songContext.Provider>;
};
