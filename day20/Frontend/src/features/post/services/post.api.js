import axios from "axios";
const api = axios.create({
  baseURL:'http://localhost:3000/api',
  withCredentials:true
})


/**
 * 
 * @returns get all user post
 */
export async function getFeed() {
  try {
    const response = await api.get("/posts/allUserPost");
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserFeed(){
    try {
        const response= await api.get('/posts/');
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}




