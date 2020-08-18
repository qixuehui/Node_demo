var express = require('express')
    // var User = require('./models/user')
    // var md5 = require('blueimp-md5')
var seesionr = require('./routes/session')
var Topic = require('./models/topic')
    //创建
var router = express.Router()
    //获取分类
router.use(seesionr)
    //主界面
router.get('/', async function(req, res) {
    // console.log(req.session.user);
    try {
        const data = await Topic.find({})
        res.render("index.html", {
            user: req.session.user,
            topics: data
        })
    } catch (e) {
        throw e
    }
})
module.exports = router