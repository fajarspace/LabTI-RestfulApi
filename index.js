const express = require('express');
const UsersRoute = require('./routes/users');
const MiddlewareReqLogs = require('./middleware/logs');

const app = express();

app.use(MiddlewareReqLogs)
// app.method(path, handler); (routing in express)
app.use('/users', UsersRoute)

app.listen(4000, () => {
  console.log('server berjalan di port 4000');
})