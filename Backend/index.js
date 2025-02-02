import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { nanoid } from 'nanoid';
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config();

const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.json({ strict: false }));


mongoose.connect(process.env.DATABASE_URL)
.then(() => { console.log("DB connection successfully") })
.catch((err) => { console.log("FAILEd DB", err) })
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("✅ DB connection successful!"))
// .catch(err => console.error("❌ DB Connection Failed:", err));

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

// every 5 min
setInterval(() => {
    axios.get('https://url-shortener-vd2p.onrender.com')
        .then(() => console.log("✅ Server pinged successfully!"))
        .catch(err => console.error("❌ Ping failed:", err.message))
}, 5 * 60 * 1000)

app.listen(3000, () => { console.log("Server is listening on 3000")})