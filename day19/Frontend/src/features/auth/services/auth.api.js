import axios from "axios";
import { toast } from "react-toast";

const api = axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})

async function register(user){

   try {
    const response = await api.post('/auth/register',user)

    return response.data
    
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
    
   }


} 


async function login(user){

   try {
    const response = await api.post('/auth/login',user)

    return response.data
    
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
    
   }

}

async function getMe(){
    try {
        const response = await api.get('/auth/get-me');
        return response.data
        
    } catch (error) {
        console.log(error)
        
    }
}

// export default register
export {login,getMe ,register}