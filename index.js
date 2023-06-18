const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// import AsistenModel from "./models/AsistenModel.js";
// import DosenModel from "./models/DosenModel.js";
// import JamModel from "./models/JamModel.js";
// import KelasModel from "./models/KelasModel.js";

const db = require("./config/Database.js");
const authRoute = require("./routes/authRoute.js");
const jadwalRoute = require("./routes/jadwalRoute.js");
const userRoute = require("./routes/userRoute.js");

dotenv.config();
const app = express();

// (async () => {
//   await db.sync();
// })();

// try {
//   await db.authenticate();
//   console.log("Database Connected...");
//   await KelasModel.sync();
// } catch (error) {
//   console.error(error);
// }
const sessionStore = new SequelizeStore({
  db: db,
});
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: "MyCoolWebAppCookieName", // This needs to be unique per-host.
    cookie: {
      secure: "auto", // required for cookies to work on AUTO
      // httpOnly: false,
      // sameSite: "none",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(cookieParser());
app.use(express.json());

// Route
app.use(authRoute);
app.use(userRoute);
app.use(jadwalRoute);

// store.sync(); // add field session

app.listen(process.env.PORT, () =>
  console.log(`Server berjalan di port '${process.env.PORT}'`)
);
