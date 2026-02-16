import express from 'express'



const app = express()  // call express  server instances create karna

app.get('/', (req, res) => {  // route create karna
    res.send('Hello World')  // response bhejna
})

app.listen(4000)  // server start karna