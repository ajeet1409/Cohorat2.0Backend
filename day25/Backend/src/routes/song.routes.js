import express from "express";
import upload from "../middleware/upload.middleware.js";
import songController from "../controllers/song.controller.js";


const songRouter = express.Router();

/**
 *  @routes POST /api/songs/
 * @des upload a song
 *
 */

songRouter.post("/", upload.single("song"),songController.songUpload);

/**
 * @routes GET /api/songs/
 * @des get a song
 */

songRouter.get('/',songController.getSong)

export default songRouter;
