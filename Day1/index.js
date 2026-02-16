import express from 'express'

const app = express()

app.get('/',function(req,res){
    res.send("hello");
})



app.listen(4000,()=>{
    console.log("server start at port 3000")
})
