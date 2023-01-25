import express,{Application,Request,response} from 'express'
import cors from 'cors'
import "dotenv/config"
const dataBase = require('./index')

const app:Application =express()

app.use(express.json())
app.use(cors())


dataBase.startServer()

export{app}


