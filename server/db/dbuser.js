const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./DBConfig');
const pool = mysql.createPool(dbconfig);
const router = express.Router();
const sql = {
    login:'select * from user_ where username=?',
}
exports.login=(username,pwd,callback)=>{
    pool.getConnection(function (err,connection) {
        connection.query(sql.login,[username],function (err,result) {
            if(err){
                throw err;
                callback(-1);
            }
            //console.log('数据层：'+result);
            callback(result);
            connection.release();
        })
    })
}