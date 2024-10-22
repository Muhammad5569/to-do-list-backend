const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const taskScheme = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    categoryId:{
        type:Number,
        ref:'Category'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Task= mongoose.model('Task', taskScheme)
module.exports = Task