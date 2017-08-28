var socket = io();

socket.on('connect', function() {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'Claire',
    text: 'This is a message Emitted from the Client'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('Received Message on Client', message)
});
