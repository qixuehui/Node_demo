var express = require('express')
    // var User = require('./models/user')
    // var md5 = require('blueimp-md5')
var seesionr = require('./routes/session')

//创建
var router = express.Router()
    //获取分类
router.use(seesionr)
    //主界面
router.get('/', function(req, res) {
    res.render("index.html", {
        user: req.session.user
    })
})
module.exports = router