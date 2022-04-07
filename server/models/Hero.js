const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{type:String},
    awatar:{type:String},
    banner:{type:String},
    title:{type:String},
    categories:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}],
    scores:{
        diffcult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],
    items1:[{type:mongoose.Schema.Types.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.Schema.Types.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.Schema.Types.ObjectId,ref:'Hero'},
        description:{type:String}
    }]

})


module.exports = mongoose.model('Hero',schema,'heroes')