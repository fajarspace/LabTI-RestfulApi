const express = require('express');
const UsersRoute = require('./routes/users');
const middlewareReqLogs = require('./middleware/logs');
const port = 4000;

const app = express();

// middleware
app.use(middlewareReqLogs)
app.use(express.json()) // izinkan req berupa json

// app.method(path, handler); (method routing in express)
app.get('/', (req, res) => {
  res.json({
    message: 'Halooo'
  })
})

app.use('/users', UsersRoute)

app.listen(port, () => {
  console.log('server berjalan di port', port);
})