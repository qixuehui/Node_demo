var express = require('express')
var user = require('./models/user')
var md5 = require('blueimp-md5')
    //创建
var router = express.Router()


//主界面
router.get('/', function(req, res) {
    res.render("index.html", {

    })
})

//注册
router.get('/register', function(req, res) {
    res.render("register.html", {

    })
})

router.post('/register', function(req, res) {

    })
    //登录

router.get('/login', function(req, res) {
    res.render("login.html")
})

router.post('/login', function(req, res) {

})

router.get('/logout', function(req, res) {
    res.redirect('/')
})


module.exports = router