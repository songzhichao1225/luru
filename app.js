var express = require('express')
var bodyParser = require('body-parser')
var static=require('express-static')

var app = express()
var user = require('./router/user.js')
var xinxi = require('./router/xinxi.js')


app.listen(8080);

app.use(bodyParser.urlencoded({}));
app.use('/user',user)
app.use('/xinxi',xinxi);

app.use(static('./'))











