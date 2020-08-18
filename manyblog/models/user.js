var mongoose = require('mongoose')

//连接
var db = require('./db')
    // mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })

var Schema = mongoose.Schema
    //设计模型
var userSchema = new Schema({
    //邮箱
    email: {
        type: String,
        required: true
    },
    //名字
    nickname: {
        type: String,
        required: true
    },
    //密码
    password: {
        type: String,
        required: true
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    //最后编辑时间
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    //头像
    avatar: {
        type: String,
        default: '/public/img/avatat.png'
    },
    //
    bio: {
        type: String,
        default: ''
    },
    //性别
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    //出生
    birthday: {
        type: Date
    },
    //权限
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
})


//建模

module.exports = mongoose.model('User', userSchema)