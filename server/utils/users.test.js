const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Stan',
      room: 'Node Course'
    },{
      id: '3',
      name: 'Sarah',
      room: 'React Course'
    }];
  });

  it('should add a user', () => {
    var users = new Users();
    var myUser = {id: '123', name: 'Joel', room: 'Test Room'};
    var resUser = users.addUser(myUser.id, myUser.name, myUser.room);

    expect(users.users).toEqual([myUser])
  });

  it('should get user array', () => {
    var usersArr = users.getUserList('Node Course');
    var testArr = ['Mike', 'Stan'];

    expect(usersArr).toEqual(testArr);
  });

  it('should remove user by id', () => {
    var newArr = users.removeUser('1');

    expect(users.users.length).toEqual(2);
    expect(newArr).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    });
  });
  it('should get user by id', () => {
    var user = users.getUser('3');

    expect(users.users.length).toEqual(3);
    expect(user).toEqual({
      id: '3',
      name: 'Sarah',
      room: 'React Course'
    });
  });
});
