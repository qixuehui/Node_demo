var express = require('express')
var user = require('../models/user')

var router = express.Router()

//管理员
router.get('/settings/admin', function(req, res) {
        res.render('settings/admin.html', {
            user: req.session.user
        })
    })
    //个人资料
router.post('/settings/admin', function(req, res) {
    //修改其密码
    var body = req.body
})

router.get('/settings/profile', function(req, res) {
        res.render('settings/profile.html', {
            user: req.session.user
        })
    })
    //修改其资料
router.post('/settings/profile', function(req, res) {

})

router.get("/settings/delete", async(req, res) => {
    //删除成功
    try {
        await user.deleteOne({ email: req.session.user.email })
        res.status(200).json({
            err_code: 200,
            message: 'OK'
        })
        req.session.user = null
    } catch (e) {
        return res.status(500).json({
            err_code: 500,
            message: e.message
        })
    }
})

module.exports = router