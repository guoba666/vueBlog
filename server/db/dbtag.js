const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./DBConfig');
const pool = mysql.createPool(dbconfig);
const router = express.Router();
const sql = {
    tagList:'select * from tag_',
}
exports.getTag=(callback)=>{
    pool.getConnection(function (err,connection) {
        connection.query(sql.tagList,function (err,result) {
            if(err){
                throw err;
                callback(-1);
            }
            callback(result);
            connection.release();
        })
    })
}