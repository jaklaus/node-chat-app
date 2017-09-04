const expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var text = 'Some test text.';
    var from = "Mr. Test";
    var message = generateMessage(from, text);

    expect(message).toInclude({
      text,
      from
    });
    expect(message.createdAt).toBeA('number');
  })
});

describe('generateLocationMessage', () => {
  it('should generate location link', () => {
    var from = 'Mr. test';
    var lat = 30
    var long = 30
    var url = `https://www.google.com/maps?q=${lat},${long}`
    var locationMessage = generateLocationMessage(from, lat, long);

    expect(locationMessage).toInclude({
      from,
      url
    });
    expect(locationMessage.createdAt).toBeA('number');
  })
})
