const express = require('express');
const UsersRoute = require('./routes/Dosen');
const middlewareReqLogs = require('./middleware/logs');
const mysql = require('mysql2');
const port = 4000;

const app = express();

// middleware
app.use(middlewareReqLogs)
app.use(express.json()) // izinkan req berupa json

// konek ke db
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elab'
});

app.use('/', (req, res) => {
  dbPool.execute('SELECT * FROM dosen', (err, rows) => {
    if (err) {
      res.json('Gak konek')
    }
    res.json({
      message: 'Konek sukses',
      data: rows
    })
  })
})

// app.method(path, handler); (method routing in express)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Halooo'
//   })
// })

app.use('/dosen', UsersRoute)

app.listen(port, () => {
  console.log('server berjalan di port', port);
})