var fs = require('fs')
var http = require('http')
var tempalte = require('art-template')
var url = require('url')


var server = http.createServer()

//文本数据库
var contents = [{
        name: 'qxh',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: 'zj',
        message: '您好呀~呵呵嘿嘿',
        dateTime: '2015-10-16'
    },
    {
        name: 'xzq',
        message: '人具体的有就一个都感觉',
        dateTime: '2015-10-16'
    },
    {
        name: 'zsh',
        message: '发挥开发空军飞机阿克苏分',
        dateTime: '2015-10-16'
    },
    {
        name: 'zhm',
        message: '缺货缺货缺货缺货！',
        dateTime: '2015-10-16'
    }

]

server.on('request', function(req, res) {
    //使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    // var str = req.url
    var str = url.parse(req.url, true)
    pathname = str.pathname
        //到着一步发现没有样式表，主要是没有开发资源
    if (pathname === '/') {
        //返回对象
        // fs.readdirSync()
        //如果你是一个绝对路径可以不写./
        fs.readFile('./views/index.html', function(err, data) {
            if (err) {
                var dd = fs.readFileSync('./views/404.html')
                console.log(err);
                res.end(dd)
            } else {
                var htmlr = tempalte.render(data.toString(), {
                    contents: contents
                })
                res.end(htmlr)
            }
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function(err, data) {
            if (err) {
                var dd = fs.readFileSync('./views/404.html')
                console.log(err);
                res.end(dd)
            } else {
                res.end(data)
            }
        })
    }
    //请求静态资源
    else if (pathname.indexOf('/public/') === 0) {
        //./public/
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                var dd = fs.readFileSync('./views/404.html')
                console.log(err);
                res.end(dd)
            }
            res.end(data)
        })
    } else if (pathname === '/resolve') {
        var key = str.query
        var date = new Date()
        key.dateTime = date
        contents.push(key)
            //重定向到/
            //302 暂时性转移
            //301 永久性转移
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()

    } else {
        fs.readFile('./views/404.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.')
            } else {
                res.end(data)
            }
        })
    }
})

server.listen(8000, function() {
    console.log('server running......');
})