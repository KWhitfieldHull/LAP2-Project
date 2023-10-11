const Token = require("../models/token")

const authenticator = async (req, res, next) => {
    try {
        const userToken = req.headers.authorisation       
        if (userToken == "null") {
            throw new Error("No User")
            window.location.assign("login.html")
        } else {
            const validToken = await Token.getOneByToken(userToken)
            
            next()
        }
    } catch (err) {
        res.status(403).json({ error: err.message })
    }

}

module.exports = authenticator