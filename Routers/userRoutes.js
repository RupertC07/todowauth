const userController = require('../controllers/userController')
const user = require('../controllers/userController')
const middleware = require('../middlewares/userMid')

const {Router} = require('express')

const route = Router()


route.post('/', userController.signUp)
route.post('/login', userController.logIn)
// router.get('/auth', authController.auth, (req, res) => {
//     return res.send('Access to protected data');
// });

//protected routes but for testing
route.get('/profile' , middleware.authenticateToken,  (req, res) =>{

    return res.json({user : req.user})
})



module.exports = route