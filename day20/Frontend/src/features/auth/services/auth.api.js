import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

