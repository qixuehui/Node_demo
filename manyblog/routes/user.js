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
    //修改其
    var body = req.body
})

router.get('/settings/profile', function(req, res) {
    res.render('settings/profile.html', {
        user: req.session.user
    })
})

router.get("/settings/delete", async(req, res) => {
    try {
        await user.deleteOne({ email: user.session.email })
        req.session.user = null
    } catch (e) {
        throw e
    }


})

module.exports = router