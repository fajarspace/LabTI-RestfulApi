import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import db from "./database/config.js";
import SequelizeStore from "connect-session-sequelize";
import userRoute from './routes/userRoute.js';
import jadwalRoute from "./routes/jadwalRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db
});

// panggil kuchiyose
// (async () => {
//   await db.sync();
// })();

// middleware
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  SameSite: None,
  cookie: {
    secure: 'auto' // auto detek http or https
  }
}))
app.use(cors({
    credentials: true,
    origin: 'https://labti.netlify.app'
}));
app.use(express.json()); // izinkan req berupa json

// Route
app.use(authRoute);
app.use(userRoute);
app.use(jadwalRoute);

// app.method(path, handler); (method routing in express)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Halooo'
//   })
// })

// store.sync(); // add field session

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di Port ${process.env.PORT}`);
});
