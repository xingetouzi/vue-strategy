/**
 * Created by spider on 4/17/17.
 */
let Request = require('../src/service/Request');

let RequestObj = Request();
console.log(RequestObj);
console.log(RequestObj.url);
RequestObj.url = 'after change';
console.log(RequestObj.url);

let Request1 = Request();
console.log(Request1.url);