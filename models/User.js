const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roll:{
       type:String,
       default:'user'
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User