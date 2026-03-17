import { useContext, useEffect } from "react";

import { PostContext } from "../post.Context";
import {getFeed,getUserFeed,createPost, likePost,unLikePost } from '../services/post.api'

export function usePost() {
  const context = useContext(PostContext);

  const { feed, setFeed, loading, setLoading ,post, setLikeCount
    } = context;

  const handleGetFeed= async ()=>{

    try {
        setLoading(true)
        const res= await getFeed()
        console.log(res)
        setFeed(res.allUserPost)
        // return res.allUserPost
        
    } catch (error) {
        console.log(error)
        
    }finally{
        setLoading(false)
    }
  }

  const handleCreatePost = async(data)=>{

    try {
      setLoading(true)
      const res = await createPost(data)
      console.log(res)
      // setFeed([...feed,res])
      //*Sometimes React state may not update correctly if multiple updates happen.
      setFeed((prevFeed) => [...prevFeed, res])
      return res

      
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }

  }

  const handleLikePost = async(postId)=>{

    try {
      const res = await likePost(postId)
      await handleGetFeed()
      return res
    } catch (error) {
      console.log(error)
    }



  }
  const handleUnlikePost = async(postId)=>{

    try {
      const res = await unLikePost(postId)
       await handleGetFeed()
      return res
    } catch (error) {
      console.log(error)
    }



  }

  // useEffect(() => {
   
  // }, [])
  



  return { feed, handleGetFeed ,loading,post,handleCreatePost,handleLikePost,handleUnlikePost}

}
