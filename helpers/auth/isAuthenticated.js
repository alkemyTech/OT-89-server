const jwt = require('jsonwebtoken')

const IsAuthenticated = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).send({
            ok: false,
            message: 'Token Invalido'
        })
    } else {

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, data) {
            if (err) {
                return res.status(401).send({
                    ok: false,
                    message: 'Token Invalido'
                });
            } else {
                req.user = data
                next()
            }
        })
    }
}

module.exports = IsAuthenticated;