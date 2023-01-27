import express,{Application,Request,response} from 'express'
import cors from 'cors'
import "dotenv/config"
const dataBase = require('./index')
import authUser from './routes/authUser'
import userData from './routes/user'

const app:Application =express()

app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
      }
))

app.use('/api/auth',authUser)
app.use('/api/user',userData)

dataBase.startServer()

export{app}


