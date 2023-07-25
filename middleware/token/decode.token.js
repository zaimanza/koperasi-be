const jwt = require("jsonwebtoken")

require("dotenv").config()

module.exports = async (req, res, next) => {

    const authHeader = req.get("Authorization")
    if (!authHeader) {
        req.isAuth = false
        return next()
    }

    const access_token = authHeader.split(" ")[0] //Bearer token
    if (!access_token || access_token === "") {
        req.isAuth = false
        return next()
    }

    let fetched_user
    try {
        fetched_user = jwt.verify(access_token, process.env.AUTH_KEY)

    } catch (err) {

        req.isAuth = false
        return next()
    }

    if (fetched_user?.people_uid) {
        req.fetched_user = fetched_user
        req.isAuth = true
    }
    return next()
}