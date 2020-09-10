var jwt = require('jsonwebtoken');
module.exports = function (req,res,next) {
    if(req.headers['authorization']){
        var token = req.headers['authorization'];
        var decoded = jwt.decode(token,'mykey');
        // 如果过期了就重新登录
        // 验证token也需要优化
        if(token&&decoded.exp<=Date.now()/1000){
            return  res.sendStatus(403);
        }
    }

    next();
}
/*
module.exports = function (token) {
    let decoded = jwt.decode(token,'mykey');
    return decoded;
}*/
