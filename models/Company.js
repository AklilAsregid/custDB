const mongoose = require('mongoose')
const Schema = mongoose.Schema

let companySchema = new Schema({
    companyName:{
        type : String
    },
    companyEmail : {
        type : String
    },
    companyDescription : {
        type : String
    },
    companyCategory : {
        type : String 
    },
    //used as a foreign key to link between contact person and company many => 1 relation
    companyContactPersons : [{
        type : Schema.Types.ObjectId,
        ref : "Contact"
    }],
    companyWebsite : {
        type : String
    },
    companyPhoneNumber : {
        type : String
    },
    companyImage : {
        type : String
    },
    date:{
        type:Date,
        default:Date.now
    },

})

const Company = mongoose.model('Company',companySchema)
module.exports = Company