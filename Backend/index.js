import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { nanoid } from 'nanoid';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) return cachedDb;
  try {
    const client = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = client;
    console.log("DB connected successfully");
    return client;
  } catch (err) {
    console.error("DB connection failed", err);
    throw err;
  }
};

connectDB();

mongoose.connect(process.env.DATABASE_URL)
.then(() => { console.log("DB connection successfully") })
.catch((err) => { console.log("FAILEd DB", err) })

const urlSchema = new mongoose.Schema({
    originalUrl:String,
    shortUrl:String,
    clicks: {type:Number, default:0},
})

const Url = mongoose.model('Url', urlSchema)

app.post('/api/short', async (req, res) => {
    try {
        const { originalUrl } = req.body
        if(!originalUrl) return res.status(400).json({message: "Url not found"})
        const shortUrl = nanoid(8)
        const url = new Url({ originalUrl, shortUrl })
        await url.save()
        res.status(200).json({message: "URL generated", url: url})
    } catch (err) {
        res.status(500).json({message: "Server Error"})
    }
})

app.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });
        if(url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(400).json({message: "Url not found"})
        }
    } catch (err) {
        res.status(500).json({message: "Server Error"})
    }
})

app.get('/test', (req, res) => {
    res.json({ message: "Backend is working!" });
});


//app.listen(PORT, () => { console.log(`Server is listening on ${PORT}`) });
module.exports = app;