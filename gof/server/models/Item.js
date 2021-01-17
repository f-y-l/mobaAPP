const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
    name: {type:String, unique:[true, 'name已存在']},
    icon: {type:String}
})

// 导出mongoose模型
module.exports = mongoose.model('Item',schema)