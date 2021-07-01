const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

//configuring dotenv for using process.env
dotenv.config()

const app = express()

//connection to database mongodb
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((con) => {
    console.log("connected to db")
}).catch(err => console.log(err))

//enabling cors
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())
//for using json webtoken
app.use(express.static('./public'))

//routes
//this route will contain CRUD operation for both Contact and
app.use('/api/index',require('./routes/api/index.js'))
//this page will handle login and registration of user
app.use('/api/auth',require('./routes/api/auth.js'))

// //handle Productin
//     //static folder
//     app.use(express.static(__dirname + '/server/public/'))

//     //handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/server/public/index.html'))
const port = process.env.PORT || 5000  
app.listen(port,()=> console.log(`server is runnning on Port ${port} `))