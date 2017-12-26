

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'xh971225',
    database:'luru'
})
router.post('/select',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.query(`SELECT * FROM user WHERE user='${req.body.user}'`,function(err,rows){
        if(err) throw err
        if(rows.length == 0){
            res.send('失败')
        }else{
            res.send(rows)
        }
    })
})

router.post('/biubiu',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.query(`SELECT * FROM user WHERE user='${req.body.user}' AND pass='${req.body.pass}'`,function(err,rows){
        if(err) throw err
        if(rows.length == 0){
            res.send('失败')
        }else{
            res.send(rows)
        }
    })
})

module.exports = router;
