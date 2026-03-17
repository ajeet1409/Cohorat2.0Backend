import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usePost.js";
import Nav from "../../shared/components/Nav.jsx";

const Feed = () => {
  const { feed, handleGetFeed ,loading} = usePost();
  console.log(feed);
  // const [post, setPost] = useState([])

  useEffect(() => {
    handleGetFeed()
  }, []);

 if(loading || !feed){
  return <main><h1>feed is loading</h1></main>

 }

  return (
    <div className="feed-page">
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.reverse().map((post, index) => {
            return <Post key={index} user={post.user} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
