import songModel from "../models/song.model.js";
import id3 from "node-id3";
import storageService from "../service/storage.service.js";

const songUpload = async (req, res) => {
  // console.log(req.file);
  const { mood } = req.body;
  const songBuffer = req.file.buffer;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "/chorat-2/modify/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "/chorat-2/modify/posters",
    }),
  ]);

  // const songFile = await storageService.uploadFile({
  //   buffer: songBuffer,
  //   fileName: tags.title + ".mp3",
  //   folder: "/chorat-2/modify/songs",
  // });
  // console.log(songFile);

  // const posterFile = await storageService.uploadFile({
  //   buffer: tags.image.imageBuffer,
  //   fileName: tags.title + ".jpeg",
  //   folder: "/chorat-2/modify/posters",
  // });
  // console.log(posterFile);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood,
  });

  return res.status(201).json({ message: "song created successfully", song });
};

async function getSong(req, res) {
  const { mood } = req.query;

  const song = await songModel.find({ mood });

  return res.status(200).json({ message: "song fetched successfully", song });
}
export default { songUpload, getSong };
