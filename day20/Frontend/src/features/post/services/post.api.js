import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/**
 *
 * @returns get all user post
 */
export async function getFeed() {
  try {
    const response = await api.get("/posts/allUserPost");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @returns only user feeds
 */
export async function getUserFeed() {
  try {
    const response = await api.get("/posts/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @des create a new post
 */
export async function createPost(data) {
  try {
    const response = await api.post("/posts/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId){
  try {
    
    const response= await api.post(`/posts/like/${postId}`)
    return response.data

  } catch (error) {
    console.log(error)
    
  }

}
export async function unLikePost(postId){
  try {
    
    const response = await api.delete(`/posts/unlike/${postId}`)
    return response.data

  } catch (error) {
    console.log(error)
    
  }

}



