const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected`);

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welcome ${params.name} to the ${params.room} chat.`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `Welcome ${params.name} to the chat room!`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log(`Message:`, message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.')
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
    console.log(`User was disconnected`);
  });

});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/chat', (req, res) => {
  res.render('chat');
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
