var express = require('express')
var user = require('../models/user')
var Topics = require('../models/topic')
var Comment = require('../models/commet')
const { json } = require('body-parser')
    // var User = require('../models/user')

var router = express.Router()

//新建博客
router.get('/topics/new', function(req, res) {
    res.render("topics/new.html", {
        user: req.session.user
    })
})

router.post('/topics/new', async function(req, res) {
    var body = req.body
        // body["nickname"] body["email"] 来查找
    body["email"] = req.session.user.email
    body["nickname"] = req.session.user.nickname
    try {
        await new Topics(body).save()
        return res.status(200).json({
            err_code: 200,
            message: 'save ok'
        })
    } catch (e) {
        return res.status(500).json({
            err_code: 500,
            message: e.message
        })
    }
})

//浏览博客
router.get('/topics/show', async function(req, res) {
    // 有可能会有\"转义符，排除掉它
    var id = req.query.id.replace(/\"/g, "")
    console.log(req.query.id);
    console.log('------------');
    // cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
    // console.log(req.session);
    try {
        var data = await Topics.findOne({ _id: id })
        var comments = await Comment.findOne({ articleId: id })
            // console.log(data._doc);
            // console.log(comments);
        res.render("topics/show.html", {
            topics: data._doc,
            comments: comments,
            // undefined 但是我们的目的是为了获取其为true而已
            user: req.session.user
        })
    } catch (e) {
        // post
        throw e
    }
})
router.post('/topics/show', function(req, res) {
    res.render("topics/show.html", {
        user: req.session.user
    })
})

//管理员
router.get('/settings/admin', function(req, res) {
        res.render('settings/admin.html', {
            user: req.session.user
        })
    })
    //个人资料

router.get('/settings/profile', function(req, res) {
    res.render('settings/profile.html', {
        user: req.session.user
    })
})

module.exports = router