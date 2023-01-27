import express  from "express"
import {getUserData } from '../controllers/user'
const router = express.Router()

router.get('/userData',getUserData)

export default router






