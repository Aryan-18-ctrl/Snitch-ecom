
import multer from "multer";

const storage = multer.memoryStorage()

export const uploads = multer({storage : storage} , {
  limits: {
    fileSize: 2 * 1024 * 1024  ,
    files: 5, 
  }
})