const express = require('express');
const router = express.Router();

router.post('/login',function (req,res) {
    console.log("登陆提交成功1");
    console.log(req.body.user.name);
    res.json({
        result:2,
    })
})
module.exports = router;