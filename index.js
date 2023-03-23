import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from 'express-session';
import SequelizeStore from "connect-session-sequelize";

import db from "./config/Database.js";
import authRoute from "./routes/authRoute.js";
import jadwalRoute from "./routes/jadwalRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();

// (async()=>{
//     await db.sync();
// })();

// try {
//   await db.authenticate();
//   console.log('Database Connected...');
//   await User.sync()
// } catch (error) {
//   console.error(error);
// }
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db
});
app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
  name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
  cookie: {
    secure: "auto", // required for cookies to work on AUTO
    httpOnly: false,
    sameSite: 'none'
  }
}))
app.use(cors({
    credentials: true,
    origin: 'https://labti.netlify.app'
}));

// app.use(cookieParser());
app.use(express.json());

// Route
app.use(authRoute);
app.use(userRoute);
app.use(jadwalRoute);

// store.sync(); // add field session

app.listen(process.env.PORT, ()=> console.log(`Server berjalan di port '${process.env.PORT}'`));
