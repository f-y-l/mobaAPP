const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
    username: {type:String, unique:[true, 'name已存在']},
    password :{type:String,
        select: false,
        set(val){
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

// 导出mongoose模型
module.exports = mongoose.model('AdminUser',schema)