// /* 
// -server create karna
// -server ko config karna

// */

// import express from "express";

// export const app = express();


// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// const notes=[]  // data store in object format

// app.get("/", (req, res) => {
//   res.send("hellllllllooo");
// });

// /*
// post notes
// */

// app.post('/notes',(req,res)=>{


//    notes.push(req.body)
//     console.log(req.body)

// res.send('notes creates')

// })

// /*
// get notes
// */
// app.get('/notes',(req,res)=>{
//     res.json({notes})
// })

// /*
// delete notes
// */

// app.delete('/notes/:id',(req,res)=>{

//     const {id} = req.params
    
//     delete notes[id]

    
//     res.send("notes delete")

// })


// /*
// patch /notes/:index
// */

// app.patch('/notes/:id',(req,res)=>{

//     const { id: idx } =  req.params
//     console.log(idx)

//     notes[idx].description=req.body.description
//     res.send("update description")



// })


import express from 'express'

export const app = express()  // server create hogya mena instance create hua

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("hello")
})

const notes=[]

//post notes

app.post('/notes',(req,res)=>{

    
    console.log(req.body)
    notes.push(req.body)

    res.status(201).json({message:"notes creates successfully"})
    // res.send("notes created")

});

//get notes

app.get('/notes',(req,res)=>{

    res.status(200).json({notes})
})

//detele notes
app.delete('/notes/:id',(req,res)=>{

    const {id} = req.params

    if(notes.length>0){
    delete notes[id]

    return res.status(204).json({message:"delete notes successfully"})

    }else{
        res.json({message:"no data available"})
    }



})

// update paritalty

app.patch('/notes/:id',(req,res)=>{

    const { description}=req.body
  
    const {id} = req.params

    notes[id].description=description

   res.send("upadate notes")
})
