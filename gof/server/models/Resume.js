const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
    name: {type:String},
    email: {type:String,unique:[true, 'email已存在']},
    password:{type:String},
    isvip: {type:Boolean}
})

// 导出mongoose模型
module.exports = mongoose.model('Resume',schema)