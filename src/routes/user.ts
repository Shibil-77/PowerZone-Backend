import express  from "express"
import {getUserData } from '../controllers/userControolers'
const router = express.Router()

router.get('/getUsersData',getUserData)

export default router






