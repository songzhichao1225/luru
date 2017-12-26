
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var formidable=require('formidable');
var fs=require('fs');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'xh971225',
    database:'luru'
});
var aa='';
router.post('/insert',function(req,res){
    var num = req.body.num;
    var name= req.body.name;
    var sex= req.body.sex;
    var yung= req.body.yung;
    var szc= req.body.szc;
    var xl= req.body.xl;
    pool.query(`INSERT INTO xinxi (id,name,sex,yung,szc,xl,img) VALUES ('${num}','${name}','${sex}','${yung}','${szc}','${xl}','${aa}')`,function (err,rows){
        if(err) throw err
        res.send(rows)
    }
        
    )
});
router.post('/select',function(req,res){
    pool.query(`SELECT * FROM xinxi`,function (err, rows) {
        if(err) throw err
        res.send(rows)
    })

});
router.post('/select2',function(req,res){
    var id=req.body.id
    pool.query(`SELECT * FROM xinxi WHERE id=${id}`,function (err, rows) {
        if(err) throw err
        res.send(rows)
    })

});



router.post('/delect',function(req,res){
    var id = req.body.id
    pool.query(`DELETE FROM xinxi WHERE id='${id}'`,function (err, rows) {
        if(err) throw err
        res.send(rows)
    })

});


router.post('/img', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'pubil/img';
    form.parse(req,function(err,fields,files){
        if (err) throw err;
        for(var i in files){
            var file = files[i];
            var newName = (new Date()).getTime();
            switch(file.type){
                case 'image/jpeg':
                    newName = newName + '.jpg';
                    break;
                case 'image/png':
                    newName = newName + '.png';
                    break;
                case 'image/gif':
                    newName = newName + '.gif';
                    break;
            }
            var newPath = 'pubil/img/' + newName;
            fs.renameSync(file.path,newPath);
            aa=newName;
        }

    })
})



//登录

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
