module.exports = (app) =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/wanzhe',{ useNewUrlParser: true, useUnifiedTopology: true })


    require('require-all')(__dirname + '/../models')
}