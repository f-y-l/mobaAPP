const { Mongoose, mongo } = require("mongoose")

module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
        // 地址解析
        useNewUrlParser: true
    })
}