const todo = require('../controllers/todoController')
const middleware = require('../middlewares/userMid')

const {Router} = require('express')

const route = Router()

route.get('/' , middleware.authenticateToken, todo.getTodo)
route.post('/' , middleware.authenticateToken, todo.createTodo)
route.put('/:id' , middleware.authenticateToken, todo.updateTodo)
route.delete('/:id' , middleware.authenticateToken, todo.removeTodo)
route.put('/status/update/:id' , middleware.authenticateToken,todo.updateTodoStatus)
route.put('/status/update/:id/:newStatus' ,middleware.authenticateToken, todo.updateTodoStatus)


module.exports = route
