require('dotenv').config();
const express = require('express');
const UsersRoute = require('./routes/dosen');
const middlewareReqLogs = require('./middleware/logs');
const PORT = process.env.PORT || 4000

const app = express();

// middleware
app.use(middlewareReqLogs)
app.use(express.json()) // izinkan req berupa json

// app.method(path, handler); (method routing in express)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Halooo'
//   })
// })

app.use('/dosen', UsersRoute)

app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
})