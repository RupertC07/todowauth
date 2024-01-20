
const Joi = require('joi');

const todoSchema = Joi.object({
    todo: Joi.string().min(2).max(1000).required()
    
})




const validateTodo = async(data) => {
    try {
 
     const results = await todoSchema.validateAsync(data)
 
     return results
     
    } catch (error) {
     console.log(error)
 
     throw error
     
    }
 }

module.exports =  validateTodo





