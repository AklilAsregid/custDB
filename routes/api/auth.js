const router = require('express').Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    const { name, username, password,roll } = req.body;
    if(roll === ''){
        roll = "user"
    }
    const errors = []
    if (name == '' || username == '' || password == '') {
        errors.push('please fillout the form');
        if (errors) return res.send({ error: errors })
    }
    //check if username is already exits
    const existusername = await User.findOne({
        username: req.body.username
    });
    if (existusername) return res.send({ error: 'The username enterd is already exist' })

    //hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)


    const user = await new User({
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
        roll : roll
    });
    try {
        const savedUser = await user.save()
        res.send({
            user
        })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

router.post('/login', async(req, res) => {
    //check username if exits
    console.log(req.body.username === '')
    if(req.body.username === '' && req.body.password === ''){
        res.send("please fill out the form")
    }
    else{
    const findUsername = await User.findOne({
        username: req.body.username
    });
    if (!findUsername) return res.send({ error: 'username or password is wrong' });
    //check if password is correct
    const userfind = await bcrypt.compare(req.body.password, findUsername.password);
    if (!userfind) return res.send({ error: "password is invalid" })
    const user = {
        id: findUsername._id,
        name: findUsername.name,
        roll:findUsername.roll
    }
    jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: 7 * 24 * 60 * 60 + 's' }, (err, token) => {
        res.json({ token })
    })
}
})

module.exports = router