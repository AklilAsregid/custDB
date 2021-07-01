const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(400).send("access denied")
    try {
        const verfied = jwt.verify(token, process.env.TOKEN_SECRET)
        req.User = verfied
        next()
    } catch (err) {
        res.status(400).send("Invalid token")
    }
}