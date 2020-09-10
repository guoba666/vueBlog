var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const login = require('./routes/login');
const article = require('./routes/article');
const tag = require('./routes/tag');
const user = require('./routes/user');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/',article);
app.use('/',tag);
app.use('/user',user);
// 监听
app.listen(3060, function () {
    console.log('success listen...3000');
});
