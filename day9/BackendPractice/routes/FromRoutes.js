import express from 'express';
import userModel from '../models/User.js';

const router= express.Router();

// to create data

router.post('/create', async (req, res) => {

    const {username,email,password} = req.body
    console.log(req.body)

       const user= await userModel.findOne({email}) 

       if(user){
        return res.status(400).json({
            message:"user already exists"
        })
       }


  if(!user){
     const newuser =  new userModel({
    username,
    email,
    password

   })
    await newuser.save()

   return res.status(201).json({
        message: "user created successfully",
        user})
  }
    
})

// to find the data 

router.get('/alluser', async (req,res)=>{
       const alluser =  await userModel.find()

       return  res.status(200).json({
            message:"all user data",
           alluser
         })
})


router.delete('/delete/:id',async (req,res)=>{
    const{id} = req.params
    // console.log('hello',id)

      const remainingUser =  await userModel.findByIdAndDelete(id)   
      console.log(remainingUser)
      return res.status(200).json({
        message:"user deleted successfully",
        remainingUser
      })
    
})


router.patch('/update/:id',async(req,res)=>{
    const{id} = req.params
    const {username} = req.body
    console.log(req.body)

     const updatedUser =  await userModel.findByIdAndUpdate(id,{username},{new:true})
     console.log(updatedUser)

     return res.status(200).json({
        message:"user updated successfully",
        data:updatedUser
     })
})

router.get('/user/username:username',(req,res)=>{
   res.send(`hello ${req.params.username}`)
        
})

export default router;