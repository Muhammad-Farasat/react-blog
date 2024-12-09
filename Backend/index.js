import express from 'express'
import cloudinary from 'cloudinary'
import multer from 'multer'
import path from 'path'
import connectToDb from './api/Db/connectToDb.js'
import blogRoute from './api/Route/blog.route.js'
import userRoute from './api/Route/auth.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from "url";

const app = express()
dotenv.config()

app.use(cors())

const port = process.env.PORT || 3000
app.use(express.json())
connectToDb()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname,  "dist")));


// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: './api/upload/images', // relative path to the upload folder inside api
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Serve the images statically
app.use('/images', express.static(path.resolve(__dirname, 'api', 'upload', 'images'))); // Serve the images from the upload folder

// Handling file upload request
app.post("/upload", upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const baseUrl = req.protocol + '://' + req.get('host');
  console.log(`${baseUrl}/images/${req.file.filename}`);

  let imageUrl = `${baseUrl}/images/${req.file.filename}`;

  res.json({
    success: 1,
    image_url: imageUrl, // Dynamic URL
  });
});




app.use(blogRoute)
app.use(userRoute)

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// password:- aKXvm7KISPRfNydj

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})