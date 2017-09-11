// use es6 class structure to create the ability to save, get, and remove users

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  // removeUser
  removeUser(id){
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    };

    return user;
  }
  // getUser
  getUser(id){
    var filiteredUser = this.users.filter((user) => {
      return user.id === id;
    });

    return filiteredUser[0];
  }
  // getUserList
  getUserList(room){
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {Users};
