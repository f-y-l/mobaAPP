const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
    name: {type:String,unique:[true, 'name已存在']},
    parent: {type:mongoose.SchemaTypes.ObjectId , ref:'Category'}
})

// 导出mongoose模型
module.exports = mongoose.model('Category',schema)