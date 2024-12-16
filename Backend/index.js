import express from 'express'
import multer from 'multer'
import connectToDb from './Db/connectToDb.js'
import blogRoute from './Route/blog.route.js'
import userRoute from './Route/auth.route.js' 
import dotenv from 'dotenv'
import cors from 'cors'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const app = express()
dotenv.config()

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


// const storage = multer.diskStorage({
//   destination: '/upload/images', 
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage: storage });

// app.use('/images', express.static(path.resolve(__dirname, 'upload', 'images'))); // Serve the images from the upload folder

// app.post("/upload", upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "File upload failed" });
//   }

//   const baseUrl = req.protocol + '://' + req.get('host');
//   console.log(`${baseUrl}/images/${req.file.filename}`);

//   let imageUrl = `${baseUrl}/images/${req.file.filename}`;

//   res.json({
//     success: 1,
//     image_url: imageUrl,
//   });
// });




app.use(blogRoute)
app.use(userRoute)

app.get("/", (req, res) => {
  res.json({message: 'hello world...!'})
});

// password:- aKXvm7KISPRfNydj

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})