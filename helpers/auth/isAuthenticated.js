const IsAuthenticated = (req, res, next) => {
    const token = req.headers['Authorization']
    if (!token) {
        res.status(401).send({
            ok: false,
            message: 'Token Invalido'
        })
    }
    jwt.verify(token, process.env.SECURE, function (err, token) {
        if (err) {
            return res.status(401).send({
                ok: false,
                message: 'Token Invalido'
            });
        } else {
            req.user = token
            next()
        }
    })
}

module.exports = IsAuthenticated;