import mongoose from "mongoose";

  const noteSchema=new mongoose.Schema({
    title:String,
    description:String
})


 const notesModel = mongoose.model('notes',noteSchema)

 export default notesModel