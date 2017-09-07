var socket = io();

function scrollToBottom(){
  // Selectors
  var chatWindow = jQuery('#chat-window');
  var newMessage = jQuery('#messages').children('li:last-child');
  // Heights
  var clientHeight = chatWindow.prop('clientHeight');
  var scrollTop = chatWindow.prop('scrollTop');
  var scrollHeight = chatWindow.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    chatWindow.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server.');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-location-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]')

  if (jQuery('[name=message]').val()) {
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function() {
      messageTextbox.val('')
    });
  }
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send Location');
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.')
  });
});
