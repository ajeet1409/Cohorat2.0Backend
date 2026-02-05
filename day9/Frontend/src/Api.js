import axios from 'axios';

console.log(import.meta.env.VITE_BASE_URL)

const API = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true

}) 


export default API;