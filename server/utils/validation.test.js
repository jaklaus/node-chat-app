const expect = require('expect');
const {isRealString} = require('./validation');

// import isRealString

describe('isRealString', () => {

  it('should reject non string value', () => {
    expect(isRealString(3)).toBe(false)
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    expect(isRealString('  test  ')).toBe(true);
  });

});
