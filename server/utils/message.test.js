const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var text = 'Some test text.';
    var from = "Mr. Test";
    var message = generateMessage(from, text);

    expect(message).toInclude({text, from});
    expect(message.createdAt).toBeA('number');
  })
});
