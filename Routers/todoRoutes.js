const todo = require('../controllers/todoController')

const {Router} = require('express')

const route = Router()

route.get('/' , todo.getTodo)
route.post('/' , todo.createTodo)
route.put('/:id' , todo.updateTodo)
route.delete('/:id' , todo.removeTodo)
route.put('/status/update/:id' , todo.updateTodoStatus)
route.put('/status/update/:id/:newStatus' , todo.updateTodoStatus)


module.exports = route
