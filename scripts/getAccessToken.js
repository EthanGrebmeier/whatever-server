const jwt = require('jsonwebtoken')

async function getAccessToken(req, res, next){
    try{
        const authHeader = req.headers['authorization']
        const reqAccessToken = authHeader && authHeader.split(' ')[1]
        if (reqAccessToken == null){return res.sendStatus(401)}
        jwt.verify(reqAccessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {return res.sendStatus(401)}
            req.userId = user.id
            next()
        })
    } catch (e){
        console.log(e)
        res.sendStatus(400)
    }
}

module.exports = getAccessToken