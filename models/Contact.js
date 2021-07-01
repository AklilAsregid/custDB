const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    contactName : {
        type:String,
    },
    contactPhoneNumber : {
        type:String
    },
    contactEmail : {
        type : String
    },
    contactAddress : {
        type : String
    },
    contactPosition : {
        type : String
    },
    //used as a foreign key to link between contact person and company 1 => many realation
    contactCompany:{
        type : Schema.Types.ObjectId,
        ref : "Company" 
    },
    contactImage : {
        type : String
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const Contact = mongoose.model('Contact',ContactSchema)

module.exports = Contact