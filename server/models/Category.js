const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type: String },
    //定义parent为数据模型，关联的模型名字为Category,但是存进去的是上级名称的惟一_ID
    parent:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
})


module.exports = mongoose.model('Category',schema)