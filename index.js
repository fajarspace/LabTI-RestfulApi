import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import session from 'express-session'

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto', // auto detek http or https
  }
}))

// middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(express.json()) // izinkan req berupa json

// app.method(path, handler); (method routing in express)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Halooo'
//   })
// })


app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
})