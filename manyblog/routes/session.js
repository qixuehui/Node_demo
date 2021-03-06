var express = require('express')
var User = require('../models/user')
var md5 = require('blueimp-md5')
var topicr = require('./topic')


var router = express.Router()
    //注册
router.get('/register', function(req, res) {
    res.render("register.html")
})

// router.post('/register', function(req, res) {
//     // 1. 获取表单提交的数据
//     //    req.body
//     // 2. 操作数据库
//     //    判断改用户是否存在
//     //    如果已存在，不允许注册
//     //    如果不存在，注册新建用户
//     // 3. 发送响应
//     var body = req.body
//     User.findOne({
//         $or: [{
//                 email: body.email
//             },
//             {
//                 nickname: body.nickname
//             }
//         ]
//     }, function(err, data) {
//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: '服务端错误'
//             })
//         }
//         // console.log(data)
//         if (data) {
//             // 邮箱或者昵称已存在
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'Email or nickname aleady exists.'
//             })
//             return res.send(`邮箱或者密码已存在，请重试`)
//         }

//         // 对密码进行 md5 重复加密
//         body.password = md5(md5(body.password))

//         new User(body).save(function(err, user) {
//             if (err) {
//                 return res.status(500).json({
//                     err_code: 500,
//                     message: 'Internal error.'
//                 })
//             }

//             // 注册成功，使用 Session 记录用户的登陆状态
//             req.session.user = user

//             // Express 提供了一个响应方法：json
//             // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
//             res.status(200).json({
//                 err_code: 0,
//                 message: 'OK'
//             })
//         })
//     })
// })





router.get('/logout', function(req, res) {
    req.session.user = null
        // 重定向到登录页
    res.redirect('/login')
})

router.post('/register', async function(req, res) {
        var body = req.body
        try {
            if (await User.findOne({ email: body.email })) {
                return res.status(200).json({
                    err_code: 1,
                    message: '邮箱已存在'
                })
            }

            if (await User.findOne({ nickname: body.nickname })) {
                return res.status(200).json({
                    err_code: 2,
                    message: '昵称已存在'
                })
            }

            // 对密码进行 md5 重复加密
            body.password = md5(md5(body.password))

            // 创建用户，执行注册
            await new User(body).save()
                // 注册成功，使用 Session 记录用户的登陆状态
            req.session.user = user
            res.status(200).json({
                err_code: 200,
                message: 'OK'
            })
        } catch (err) {
            res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
    })
    //登录

router.get('/login', function(req, res) {
    res.render("login.html")
})

router.post('/login', function(req, res) {
    // 1. 获取表单提交的数据
    //    req.body
    // 2. 操作数据库
    //    判断改用户是否存在
    //    如果已存在，不允许注册
    //    如果不存在，注册新建用户
    // 3. 发送响应
    var body = req.body
        //查找是否存在
        //findOne({判断条件},回调)
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function(err, user) {
        //都没找到
        if (err) {
            //500
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: "Email or password is invalid"
            })
        }
        // 用户存在，登陆成功，通过 Session 记录登陆状态
        req.session.user = user

        return res.status(200).json({
            err_code: 0,
            message: "login ok"
        })

    })
})

router.get('/logout', function(req, res) {
    res.seddion.user = null
    res.redirect('/')
})
router.use(topicr)
module.exports = router