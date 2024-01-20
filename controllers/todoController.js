const prisma = require('../db/prisma')
const validator = require('../validators/todoValidator')

const getTodo = async(req, res) => {

    try {
    
        const results = await prisma.todo.findMany({
            where : {
                isDeleted : 0
            }
        })

        if (results.length > 0)
        {
           return  res.json({
                data : results,
                status : 200
            })   
        }
        else 
        {
           return  res.json({
                messsage : "No data available"
            })
        }
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            messsage : "Internal server error"
        })        
    }
}

const createTodo = async(req, res) => {

    const todoDesc = req.body.todo

    try {

        const {error} = await validator(req.body)
       

        const results = await prisma.todo.create({
            data : {
                todoDesc : todoDesc
            }
        })

       return res.json({
            messsage : 'Task successfully created',
            status : 200,
            dataCreated : results
        })
        
    } catch (error) {

        console.log(error)

        if (error.details) 
        {
           return res.status(400).json({messsage : 'Error in data' , status : 400, error:error.details})
            
        }
       return res.status(500).json({messsage : 'Internal Server Error' })
        
    }
}

const updateTodo  = async (req, res) => {

    const id = req.params.id 
    const newDesc = req.body.todo

    try {

        const {error} = await validator(req.body)

        const task = await prisma.todo.findUnique({
            where : {
                isDeleted : 0,
                todoId : parseInt(id)

            }
        })


        if (task)
        {
            const results = await prisma.todo.update({
                where:{
                    isDeleted : 0,
                    todoId : parseInt(id)
                },
                data : {

                    todoDesc : newDesc

                }
            })

         return  res.json({
                messsage : "Todo has been successfully updated",
                status : 200,
                dataUpdated : results
            })
            
        }
        else 
        {
          return  res.status(404).json({messsage : "Todo not found", status : 404})
        }
        
    } catch (error) {
        console.log(error)

        if (error.details) 
        {
           return res.status(400).json({messsage : 'Error in data' , status : 400, error:error.details})
            
        }
       return res.status(500).json({messsage : 'Internal Server Error' })
        
    }

}

const removeTodo  = async (req, res) => {

    const id = req.params.id 
 

    try {

        const task = await prisma.todo.findUnique({
            where : {
                isDeleted : 0,
                todoId : parseInt(id)

            }
        })


        if (task)
        {
            const results = await prisma.todo.update({
                where:{
                    isDeleted : 0,
                    todoId : parseInt(id)
                },
                data : {

                    isDeleted : 1

                }
            })

           return res.json({
                messsage : "Todo has been successfully removed",
                status : 200,
                dataUpdated : results
            })
            
        }
        else 
        {
           return res.status(404).json({messsage : "Todo not found", status : 404})
        }
        
    } catch (error) {
        console.log(error)
      return  res.status(500).json({messsage : "Internal server error", status : 500})

        
    }

}

const updateTodoStatus  = async (req, res) => {

    const id = req.params.id 
    const newStatus = req.params.newStatus

    try {

        if ( !parseInt(newStatus) || (parseInt(newStatus) <0 || parseInt(newStatus) >2 ))
        {

            res.status(400).json({
                messsage : 'Invalid status',
                status : 400
            })

            return  

            
        } 


        const task = await prisma.todo.findUnique({
            where : {
                isDeleted : 0,
                todoId : parseInt(id)

            }
        })


        if (task)
        {
            const results = await prisma.todo.update({
                where:{
                    isDeleted : 0,
                    todoId : parseInt(id)
                },
                data : {

                    todoStatus : parseInt(newStatus)

                }
            })

          return  res.json({
                messsage : "Todo has been successfully updated",
                status : 200,
                dataUpdated : results
            })
            
        }
        else 
        {
          return  res.status(404).json({messsage : "Todo not found", status : 404})
        }
        
    } catch (error) {
        console.log(error)
      return  res.status(500).json({messsage : "Internal server error", status : 500})

        
    }

}




module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    removeTodo,
    updateTodoStatus

}