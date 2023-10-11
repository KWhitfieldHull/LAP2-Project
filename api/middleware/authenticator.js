const Token = require("../models/token")

const authenticator = async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"];
        if (userToken == "null") {
            throw new Error("No User")
        } else {
            const validToken = await Token.getOneByToken(userToken)
            return next()
        }
    } catch (err) {
        res.status(403).json({ error: err.message })
    }

}

module.exports = authenticator
