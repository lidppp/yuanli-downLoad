const https = require("https")
const express = require("express")
const router = require("./router")
const fs = require("fs")
const path = require("path")
const app = express()

var bodyParser = require('body-parser');/*post方法*/
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    // originArr = ["http://localhost:3001","http://localhost:3000"]
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.use("/",router)


// app.listen(443,() => console.log(`Example app listening on port ${8001}!`))
const options = {
    key:fs.readFileSync(path.resolve(__dirname,"../https/localhost_key.key")),
    cert:fs.readFileSync(path.resolve(__dirname,"../https/localhost_chain.crt"))
}

https.createServer(options,app).listen(8001,() => console.log(`Example app listening on port ${8001}!`))
