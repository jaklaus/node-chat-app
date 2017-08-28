const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected`);

  socket.emit('newMessage', {
    from: 'Joel',
    text: 'Hi! This is emitted from the server',
    createdAt: 55343
  });

  socket.on('createMessage', (message) => {
    console.log(`Message:`, message)
  })

  socket.on('disconnect', () => {
    console.log(`User was disconnected`);
  });
});

app.get('/', (req, res) => {
  res.render('index');
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
