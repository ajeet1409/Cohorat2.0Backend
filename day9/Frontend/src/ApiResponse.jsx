import API from "./Api";



//  create new user



//get all user data

export const getAllUser =  () => {
    try {
        return API.get('/user/alluser',{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        
        
    } catch (error) {
        console.log("error while calling getAllUser API", error);
        
    
    }
}


// !delete user

export const  deleteuser =  (id)=>{

    try {
        return API.delete(`/user/delete/${id}`)
    } catch (error) {
        console.log("userdeleted",error)
        
    }

    

}



