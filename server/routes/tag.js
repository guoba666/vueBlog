const express = require('express');
const router = express.Router();
const tag = require('../db/dbtag');
router.get('/tagList',(req,res)=>{
    tag.getTag((result)=>{
        res.send(JSON.stringify(result));
    })
})
module.exports = router;