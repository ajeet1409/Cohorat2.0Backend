import { useContext } from "react";

import { PostContext } from "../post.Context";
import {getFeed,getUserFeed} from '../services/post.api'

export function usePost() {
  const context = useContext(PostContext);

  const { feed, setFeed, loading, setLoading ,post, setLikeCount} = context;

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




  return { feed, handleGetFeed ,loading,post}

}
