const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
    title: {type:String,unique:[true, '标题已存在']},
    articles: [{type:mongoose.SchemaTypes.ObjectId , ref:'Category'}],
    context: {type:String}
})

// 导出mongoose模型
module.exports = mongoose.model('Article',schema)