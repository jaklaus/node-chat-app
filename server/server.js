const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected`);

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Welcome a new user to the chat room!'))

  socket.on('createMessage', (message, callback) => {
    console.log(`Message:`, message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.')
    });

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
