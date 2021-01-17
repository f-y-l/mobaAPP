const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type:String,unique:[true, 'name已存在']},
    avatar : {type:String},
    title: {type:String},
    // 关联的是其他数据的id    .name名称， 指定关联Category模型的id
    categories: [{type: mongoose.SchemaTypes.ObjectID, ref:'Category'}],
    scores: {
        difficult : {type: Number ,min:1 ,max:[9,'max is 5']},
        skills : {type: Number ,min:1 ,max:9},
        attack : {type: Number ,min:1 ,max:9},
        survive : {type: Number ,min:1 ,max:9}
    },
    skills:[{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    items1:[{type: mongoose.SchemaTypes.ObjectID, ref:'Item'}],
    items2:[{type: mongoose.SchemaTypes.ObjectID, ref:'Item'}],
    usageTips:{type: String},
    battleTips:{type: String},
    teamTips:{type: String},
    partners:[{
        hero: {type: mongoose.SchemaTypes.ObjectID, ref:'Hero'},
        decription:{type: String}
    }]
})

module.exports = mongoose.model('Hero', schema)
