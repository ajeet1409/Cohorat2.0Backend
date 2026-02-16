/**
 * server create  karna
 * server ko config karna
 */

import dotenv from "dotenv";
import express from "express";
import noteModel from "./models/notes.model.js";

export const app = express();

app.use(express.json())

dotenv.config();

//* post api
app.get('/',(req,res)=>{
    res.send('hello')
})

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({ messaage: "note create successfully", notes });
});

//**  get api  */

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({ message: "note create successfully" , notes});
});

//** delete notes */

app.delete("/api/notes/:id", async (req, res) => {
    const {id}=req.params
  const notes = await noteModel.findByIdAndDelete(id);
  res.status(200).json({ message: "note create successfully" , notes});
});

// ** update notes

app.patch("/api/notes/:id", async (req, res) => {
    const {id}=req.params
    const {description}=req.body

  const notes = await noteModel.findByIdAndUpdate(id,{ description, });
  res.status(200).json({ message: "note update successfully" , notes});
});
