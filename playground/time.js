var moment = require('moment');

// var date = moment();
// date.subtract(10, 'y');
// console.log(date.format("dddd, MMMM Do YYYY, h:mm a"));

var date = moment();

console.log(date.format('h:mm a'));
console.log(date.subtract(25, 'm').fromNow());
