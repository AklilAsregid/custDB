const express = require('express')
const router = express.Router()
const Guard = require('./verifytoken.js')
const Company = require('../../models/Company.js')
const Contact = require('../../models/Contact.js')
const User = require('../../models/User')

router.get('/',Guard,(req, res)=>{
    res.send("Wellcome here")
})

//list all company we have
//route api/index/company @GET
router.get('/company', async (req, res)=>{
   const company =  await Company.find({}).populate()
   res.send(company)
})
//create new
//route api/index/company @POST 
router.post('/company',async (req, res)=>{
    const {companyName, companyEmail, companyDescription ,
         companyCategory,companyContactsPerson,companyWebsite,
         companyPhonenumber,companyImage} = req.body;
    const companyAdd = await Company(req.body).save();
    console.log(companyAdd)
    res.send(req.body);
    res.json(companyAdd);
})
//this route will list company contacts person(many)
//route api/index/company/:id @GET -----need---help---
router.get('/company/contacts/:id',async (req, res)=>{
    const companyId = req.params.id
    // const allContact = await 
})

//this route will add contact person to a company
// route api/index/company/:id @POST
router.post('/company/:id', async(req,res)=>{
    const {contactName, contactPhonenumber, 
        contactAddress, contactEmail,contactPosition} = req.body
    const contactComapany = req.params.id;
    
    //adding new contact person to a company
    const newContact = await Contact({contactName,contactPhonenumber,contactAddress, contactEmail,contactPosition,contactComapany}).save();
    res.send(newContact);
})

//this route will list 1 contact person with in a company
//route /api/index/company/contact/:id @GET
router.get('/company/contact/:id', async(req, res)=>{
    const contactId = req.params.id
    //find by contact id
    const oneContact = await Contact.findOne(contactId)
    res.send(oneContact)
})

//this route will edit contact person with in a company
//route /api/index/company/contact/:id @Put
router.put('/company/contact/:id',async(req, res)=>{
    const contactId = req.params.id
    const updateContact = await Contact.findByIdAndUpdate({contactId},req.body)
    res.send(updateContact)
})

//this route will delete contact person 
router.delete('/contact/contact/:id', async(req, res)=>{
    const contactId = req.params.id
    const deleteContact = await Contact.findOneAndDelete(contactId)
})

//this route will contain list of all user that admin can do magic with it
//route /api/index/users @GET
router.get('/users',Guard,async (req, res)=>{
    const allUsers = await User.find({});
    res.status(200).send(allUsers)
})


module.exports = router;