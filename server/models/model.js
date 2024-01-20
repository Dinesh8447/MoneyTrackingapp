const mongoose = require('mongoose')

const modelschema = new mongoose.Schema({
    name:String,
    datatime:Date,
    description:String,
    price:Number,
})

module.exports=mongoose.model('date',modelschema)