const express = require('express')
const app = express()

// 设置全局变量
app.set('secret','www.gether.cn')

// 使用跨越
app.use(require('cors')())
// 使用express json中间件
app.use(express.json())
// 托管静态文件
app.use('/uploads', express.static(__dirname+'/uploads'))

// 引用路由(默认找index.js里的app)
require('./routes/admin')(app)
// 引用数据库(指定db.js里的app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})