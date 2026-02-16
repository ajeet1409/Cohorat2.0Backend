
/**
 * server ko create karna 
 * server ko config 
 */

import express from 'express'

export const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("helloo")
})

const notes=[]
// post notes 

app.post('/notes',(req,res)=>{

    notes.push(req.body)
    
    res.status(201).json({message:"note create successfully"})
})

//get notes
app.get('/notes',(req,res)=>{

   res.status(200).json({notes})
})


app.delete('/notes/:id',(req,res)=>{
 const {id} = req.params
 console.log(id)
    delete notes[id]

    res.json({message:"note delete successfullty"})

})

app.patch('/notes/:id',(req,res)=>{
   const {id} = req.params
   const {description}  = req.body

   notes[id].description=description

   res.json({message:"note update successfullty"})


})


