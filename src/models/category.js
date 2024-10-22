const mongoose =require('mongoose')
const Task = require('./task')
const categoryScheme = new mongoose.Schema({
    id:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required:true
    }
})

categoryScheme.virtual('categories',{
    ref:'Task',
    localField:'id',
    foreignField:'categoryId'
})