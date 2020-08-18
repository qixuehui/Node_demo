//总连接
const mongoose = require('mongoose')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function() {
    console.log("数据库成功连接")
})
module.exports = db