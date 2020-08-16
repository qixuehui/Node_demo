var express = require('express')
var path = require('path')

var app = express()
    //公开资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))
    //中间件
app.engine('html', require('express-art-template'))


app.get('/', function(req, res) {
    res.render("index.html", {

    })

})

app.listen(8080, function() {
    console.log('running~~~');
})