import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, //  maximum 5mb
  },
});

export default upload;
