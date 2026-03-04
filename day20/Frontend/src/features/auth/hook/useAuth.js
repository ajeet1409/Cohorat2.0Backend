
import { useContext } from "react";
import { AuthContext } from "../auth.Context.jsx";
import {login,register,getMe} from '../services/auth.api.js'


export function useAuth(){
const context = useContext(AuthContext)
const {user,setUser,loading,setLoading} = context

const handleLogin = async ( user)=>{
    try {
        
        setLoading(true)
        const res= await login(user)
        setUser(res)
        console.log(res)
        return res

    } catch (error) {
        console.log(error)
        
    }finally{
        setLoading(false)
    }
   }

   const handleRegister = async (user)=>{
    try {
        setLoading(true)
        const res=await register(user)
        setUser(res)
        return res
    } catch (error) {
        console.log(error)
        
    }finally{
        setLoading(false)
    
   }

   }

   return {
    user,loading,handleLogin ,handleRegister
   }

}
