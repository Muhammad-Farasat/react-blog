import express from 'express'
import multer from 'multer'
import connectToDb from './Db/connectToDb.js'
import blogRoute from './Route/blog.route.js'
import userRoute from './Route/auth.route.js' 
import dotenv from 'dotenv'
import cors from 'cors'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'


const app = express()
dotenv.config()

const __dirname = path.resolve();
app.use(cors())

const port = process.env.PORT || 3000
app.use(express.json())
connectToDb()



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'upload', 
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`,
  },
});

const upload = multer({ storage });


app.post("/upload", upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const imageUrl = req.file.path;
  res.json({
    success: 1,
    image_url: imageUrl, 
  });
});

app.use("/api", blogRoute)
app.use("/api", userRoute)

app.get("/api/test", (req, res) => {
  res.json({message: 'hello world...!'})
});

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})