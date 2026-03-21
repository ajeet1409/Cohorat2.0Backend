import axios from "axios";

const api = axios.create({
  baseURL: "https://cohorat2-0backend.onrender.com/api",
  withCredentials: true,
});

export async function register(user) {
  try {
    const response = await api.post("/auth/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login(user){
    try {
        
        const response= await api.post('/auth/login',user)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

export async function getMe(user){
    try {
        
        const response= await api.post('/auth/get-me',user)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

