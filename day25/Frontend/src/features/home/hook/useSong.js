import { useContext } from "react";
import { songContext } from "../song.context";

import { getSong } from "../services/song.api.js";

export const useSong = () => {
  const context = useContext(songContext);

  const { song, songs, setSong, setSongs, loading, setLoading } = context;

  const handleGetSong = async ({ mood }) => {
    try {
      setLoading(true);
      const data = await getSong({ mood });
      const list = Array.isArray(data?.song)
        ? data.song
        : data?.song
        ? [data.song]
        : [];

      setSongs(list);
      setSong(list[0] ? { ...list[0] } : null);
    } catch (error) {
      console.log(error);
      setSongs([]);
      setSong(null);
    } finally {
      setLoading(false);
    }
  };

  const selectSong = (nextSong) => {
    if (!nextSong) {
      setSong(null);
      return;
    }
    setSong({ ...nextSong });
  };

  return { song, songs, loading, handleGetSong, selectSong };
};
