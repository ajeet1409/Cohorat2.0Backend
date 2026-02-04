/**
 * server ko create karna
 * server ko congif karna

  */

import dotenv from "dotenv";
import express from "express";
import notesModel from "./models/notes.model.js";

export const app = express();

dotenv.config();

app.use(express.json());

/**
 *
 * post api
 *
 */

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "notes create successfully",
    notes,
  });
});

/*
get post 
*/

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "notes fetched successfully",
    notes,
  });
});

/**
 * delete note
 */

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const notes = await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "delete note successfully",
    notes,
  });
});

app.patch("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const notes = await notesModel.findByIdAndUpdate(id, {
    description,
  });
  res.status(200).json({
    message: "notes update successfully",
    notes,
  });
});
