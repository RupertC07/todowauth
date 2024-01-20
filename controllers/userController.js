const prisma = require('../db/prisma')
const validator = require('../validators/todoValidator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const uvalidator = require('../validators/userValidator')


const signUser = async (req, res) => {
    const { userName, userEmail, userPassword, confirmPassword } = req.body;

    try {
        // if (userPassword !== confirmPassword) {
        //     return res.status(400).send('Passwords do not match');
        // }

        await uvalidator.signUpValidate(req.body)
          const existingUser = await prisma.user.findFirst({
            where: {
                userEmail: userEmail,
                userDeleted: 0
            }
        });
        if (existingUser) {
            return res.status(400).json({message : 'Email already exists'});
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const result = await prisma.user.create({
            data: {
                userName: userName,
                userEmail: userEmail,
                userPassword: hashedPassword
            }
        });

        const token = jwt.sign({id : result.userId}, process.env.ACCESS_TOKEN_SECRET , ({expiresIn : '3h'}));

        return res.json({ status: 200,
            user: {
                username : result.userName ,
                userEmail : result.userEmail ,
                createdAt : result.createdAt,
                updatedAt:result.updatedAt } ,
            token : token});

    } catch (error) {
        console.log(error)

        if (error.details) 
        {
           return res.status(400).json({messsage : 'Error in data' , status : 400, error:error.details})
        }
       return res.status(500).json({messsage : 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {

        await uvalidator.signInValidate(req.body)
        const existingUser = await prisma.user.findFirst({
            where: {
                userEmail: userEmail,
                userDeleted: 0
            }
        });
        if (!existingUser) {
            return res.status(404).send('User not found');
        }
        const isPasswordValid = await bcrypt.compare(userPassword, existingUser.userPassword);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid credentials');
        }
        const access = jwt.sign({ id: existingUser.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
        // const refresh = jwt.sign({ id: existingUser.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        return res.json({messsage : "User logged in successfully", accessToken: access});

    } catch (error) {
        if (error.details) 
        {
           return res.status(400).json({messsage : 'Error in data' , status : 400, error:error.details})
        }
       return res.status(500).json({messsage : 'Internal Server Error' })
    }
}



module.exports = {
    signUp: signUser,
    logIn: loginUser,
    
}                                                                                                    

 



























































































// const refreshToken = (req, res) => {
//     const refreshToken = req.body.token;
//     console.log(req.body);
//     if (!refreshToken) {
//         return res.status(401).send('No refresh token')
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).send('Invalid refresh token')
//         }
//         const newAccess = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
//         res.json({ accessToken: newAccess });
//     })
// }