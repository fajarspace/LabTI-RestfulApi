import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import db from "./config/Database.js";
import userRoute from './routes/userRoute.js';
import jadwalRoute from "./routes/jadwalRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// panggil kuchiyose
// (async () => {
//   await db.sync();
// })();

// middleware
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto' // auto detek http or https
  }
}))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json()); // izinkan req berupa json

// Route
app.use(jadwalRoute);
app.use(userRoute);
app.use(authRoute);

// app.method(path, handler); (method routing in express)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Halooo'
//   })
// })

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di Port ${process.env.PORT}`);
});