const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./DBConfig');
const pool = mysql.createPool(dbconfig);
const router = express.Router();
const sql = {
    articleList:'select * from article_ a,tag_ t where a.tagId=t.tagId',
    articleDetail:'select * from article_ where articleId=?',
    articlePost:'insert into article_(username,head,content,tagId) value(?,?,?,?) '
}
exports.getList=(tag,sort='popular',callback)=>{
    let selectSql = sql.articleList;
    if(tag!=0){
        selectSql = selectSql+' and a.tagId='+tag;
    }
    pool.getConnection(function (err,connection) {
        connection.query(selectSql,function (err,result) {
            if(err){
                throw err;
                callback(-1);
            }
            callback(result);
            connection.release();
        })
    })
}
exports.getDetail=(articleId,callback)=>{
    pool.getConnection((err,connection)=>{
        connection.query(sql.articleDetail,[articleId],(err,result)=>{
            if(err){
                throw err;
                callback(-1);
            }
            callback(result);
            connection.release();
        })
    })
}
exports.post=(username,head,content,tagId,callback)=>{
    pool.getConnection((err,connection)=>{
        connection.query(sql.articlePost,[username,head,content,tagId],(err,result)=>{
            if(err){
                throw err;
                callback(-1);
            }
            callback(1);
            connection.release();
        })
    })
}