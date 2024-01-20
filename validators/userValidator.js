const Joi = require("joi")

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

const signUpSchema = Joi.object({

    userName : Joi.string().min(3).max(255).required(),
    userEmail : Joi.string().email().required(),
    userPassword: Joi.string().min(8).required().pattern(
        passwordPattern
    )
    .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      }),
    confirmPassword :Joi.string().valid(Joi.ref('userPassword')).required().messages({
        'any.only' : 'Password do not match'
    })
    
})

const signInSchema = Joi.object({

    userEmail : Joi.string().email().required(),
    userPassword: Joi.string().required()
   
})


const signUpValidate = async (data) =>{

    try {

        const value = await signUpSchema.validateAsync(data)
        return value
        
    } catch (error) {
        throw error
        
    }
}


const signInValidate = async(data) =>{
    try {
        const value = await signInSchema.validateAsync(data)
        return value
    } catch (error) {
        throw error
    }

}

module.exports = {
    signUpValidate,
    signInValidate
}