import express from 'express'

const app = express()

app.use(express.json())

let notes=[]
//! jo bhi data client se aayegaa usse access karege req.body (if url de (id) aa raha hai tab req.params se access karege)
app.post('/notes',(req,res)=>{

//   const  {title,description}= req.body
notes.push(req.body)
   console.log(req.body)
res.send("notes created 12")


})

app.get('/note',(req,res)=>{
    res.send(notes)
})


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})