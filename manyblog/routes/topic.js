var express = require('express')
var user = require('../models/user')
var users = require('./user')
var Topics = require('../models/topic')
var Comment = require('../models/commet')
const bodyparser = require('body-parser')
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
        // console.log(req.query.id);
        // console.log('------------');
        // cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
        // console.log(req.session);
    try {
        var data = await Topics.findOne({ _id: id })
        var comments = await Comment.find({ articleId: id })
        console.log(comments);
        res.render("topics/show.html", {
            topics: data,
            comments: comments,
            // undefined 但是我们的目的是为了获取其为true而已
            user: req.session.user
        })
    } catch (e) {
        // post
        throw e
    }
})
router.post('/topics/show', async function(req, res) {
    // var body = req.body
    // console.log(req.session.topics._id);
    // console.log(body.articleId);
    // body[articleId] = req.session.topics._id
    // await new Comment(body).save()
    // res.status(200).json({

    // })

    // res.status(500).json({

    // })
    var body = req.body
        // [Object: null prototype] {
        //     Retextarea: 'hhh',
        //     articleId: '"5f3b3089f6a95450a03b61c2"'
        //   }
        // console.log(body);
        // 获取传过来的id
    var articleId = body.articleId.replace(/\"/g, "")
        // 5f3b3089f6a95450a03b61c2
        // console.log(articleId);
    try {
        //查找
        // console.log(111);
        var data = await Topics.findOne({ _id: articleId })
            // console.log(data);
        var comment = {}
        comment.articleId = articleId
            // 文章的email
        comment.email = data._doc.email
            //在写的评论的用户
        comment.nickname = req.session.user.nickname
        comment.comments = body.Retextarea
            // console.log(comment);
        await new Comment(comment).save()
        res.status(200).json({
            err_code: 200,
            message: 'OK'
        })
    } catch (e) {
        res.status(500).json({
            err_code: 500,
            message: e.message
        })
    }

})
router.use(users)
module.exports = router