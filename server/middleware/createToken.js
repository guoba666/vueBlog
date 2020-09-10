var jwt = require('jsonwebtoken');
//'mykey'为token生成的密钥
module.exports = function (name) {
    var expiration = new Date();    //设置过期时间
    expiration.setHours(expiration.getHours()+1);   //有效期为1小时
    const token=jwt.sign({
        name:name,
        exp:parseInt(expiration.getTime()/1000),
    },"mykey");
    return token;
}
