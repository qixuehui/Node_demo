var express = require('express')
    // var User = require('../models/user')
    // var md5 = require('blueimp-md5')

var router = express.Router()

//新建博客
router.get('/topics/new', function(req, res) {
    res.render("topics/new.html")
})

//浏览博客
router.get('/topics/show', function(req, res) {
    res.render("topics/show.html")
})

//管理员
router.get('/settings/admin', function(req, res) {
        res.render('settings/admin.html')
    })
    //个人资料

router.get('/settings/profile', function(req, res) {
    res.render('settings/profile.html')
})

module.exports = router