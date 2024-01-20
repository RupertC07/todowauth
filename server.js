const express  = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()


const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

app.listen(port , () => console.log(`Port is at : ${port}`))

const todoRoutes = require('./Routers/todoRoutes')

app.use('/api/v2/todo' , todoRoutes)

