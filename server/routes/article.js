const express = require('express');
const router = express.Router();
const article = require('../db/dbarticle');
const checkToken = require('../middleware/checkToken');
router.get('/articleList',checkToken,(req,res)=>{
    let tag = req.query.tag;
    let sort = req.query.sort;
    article.getList(tag,sort,(result)=>{
        res.send(JSON.stringify(result));
    })
})
router.get('/articleDetail',(req,res)=>{
    let articleId = req.query.articleId;
    article.getDetail(articleId,(result)=>{
        res.send(JSON.stringify(result));
    })
})
router.post('/articlePost',(req,res)=>{
    let username = req.body.username,
        head = req.body.head,
        content = req.body.content,
        tagId = req.body.tagId;
    article.post(username,head,content,tagId,(result)=>{
        res.send(JSON.stringify(result));
    })
})
module.exports = router;