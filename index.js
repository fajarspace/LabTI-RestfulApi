const express = require('express');
const UsersRoute = require('./routes/users');

const app = express();

// app.method(path, handler); (routing in express)
app.use('/users', UsersRoute)

app.listen(4000, () => {
  console.log('server berjalan di port 4000');
})