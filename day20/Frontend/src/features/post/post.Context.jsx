import { Children, createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);
  
  
  const [loading, setLoading] = useState(false);

  const value = {
    feed,
    setFeed,
    loading,
    setLoading,
    post,
    setPost,
    

   
  };

  return (
    <>
      <PostContext.Provider value={value}>{children}</PostContext.Provider>
    </>
  );
};
