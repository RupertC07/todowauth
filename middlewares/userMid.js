const jwt = require('jsonwebtoken')
const prisma = require('../db/prisma')

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) {
        return res.status(401).json({message : 'Unauthenticated user'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({message : 'Invalid or Expired Token'});
        }
        const userDB = await prisma.user.findFirst({
            where :{
                userId : parseInt(user.id),
                userDeleted : 0
            }

        })

        if (!userDB) {

            return res.status(403).json({message : 'Unauthorized user'});
            
        }

        req.user = userDB
        next();
    })
}





module.exports = {
    authenticateToken
}