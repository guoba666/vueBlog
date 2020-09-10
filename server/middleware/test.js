var createToken = require('./createToken');
var checkToken = require('./checkToken');
const token = createToken('guoba');
console.log(token);
const decode = checkToken(token);
console.log(decode.exp+"---当前exp:"+Date.now()/1000)