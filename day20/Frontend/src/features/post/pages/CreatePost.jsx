import React, { useRef } from "react";
import "../style/createpost.scss";
import { useState } from "react";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();
  const { handleCreatePost ,loading} = usePost();
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  async function handleSumbit(e) {
    e.preventDefault();

    // console.log(postImageInputFieldRef.current)
    const file = postImageInputFieldRef.current.files[0]; //* ek user multiple file select kar sakta hai par vo phali file hogi use select karna

    const data = new FormData();

    data.append("caption", caption);
    data.append("postImage", file);

    console.log(Object.fromEntries(data));
    await handleCreatePost(data);
    navigate("/");
  }

  if(loading){
    return <main><h1>feed loading...</h1></main>
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSumbit}>
          <label className="post-image-label" htmlFor="postImage">
            Select Image
          </label>
          <input
            // ?  input ko useRef karna means jo file upload hogi object mein current mein jayegii like object={current:input#postImage} and if write ( multiple ) as a  attribute  you can upload multiple file
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            value={caption}
            onInput={(e) => setCaption(e.target.value)}
            type="text"
            name="caption"
            placeholder="Enter Caption"
          />
          <button className="button primary-button">Create Post </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
