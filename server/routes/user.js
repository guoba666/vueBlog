const express = require('express');
const router = express.Router();
const user = require('../db/dbuser');
const createToken = require('../middleware/createToken');
router.post('/login',(req,res)=>{
    let username = req.body.username,
        pwd = req.body.pwd;
    user.login(username,pwd,result=>{
        //console.log('路由层：'+JSON.stringify(result));
        /*
            状态码code：
            1：成功
            0：密码错误
            -1：用户名不存在
        */
        let data = JSON.parse(JSON.stringify(result));
        if(data[0]===undefined){
            res.send(JSON.stringify({
                code:-1,
                message:'用户名不存在',
            }));
        }else{
            if(username==data[0].username){
                if(pwd==data[0].pwd){
                    res.send(JSON.stringify({
                        code:1,
                        message:'登陆成功',
                        token:createToken(username),
                    }))
                }else{
                    res.send(JSON.stringify({
                        code:0,
                        message:'密码错误',
                    }));
                }
            }
        }

    })
})
module.exports = router;