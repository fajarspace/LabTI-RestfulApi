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
// const RuangModel = require("./models/RuangModel");
// const PraktikumModel = require("./models/PraktikumModel");

const db = require("./config/Database.js");
const authRoute = require("./routes/authRoute.js");
const jadwalRoute = require("./routes/jadwalRoute.js");
const userRoute = require("./routes/userRoute.js");

dotenv.config();
const app = express();

// (async () => {
//   await db.sync();
// })();

// db.authenticate()
//   .then(() => {
//     console.log("Database Connected...");
//     return PraktikumModel.sync();
//   })
//   .then(() => {
//     console.log("DB synchronized...");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

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
    proxy: true,
    name: "MyCoolWebAppCookieName",
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

// Route - Welcome Page
app.get("/", (req, res) => {
  res.send(
    "<h1>Konek sukses!</h1><p>Click <a href='https://fajarspace.gitbook.io/praktikum-api/'>API Documentation</a></p>"
  );
});

// Route - Other Routes
app.use(authRoute);
app.use(userRoute);
app.use(jadwalRoute);

// ... (rest of the code remains the same)

app.listen(process.env.PORT, () =>
  console.log(`Server berjalan di port '${process.env.PORT}'`)
);
